import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard, Button} from '../components'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    // Simple autoplay carousel (uses post featured images or fallback gallery)
    const heroImages = (posts?.slice(0, 5) || []).map(p => ({
        id: p.$id,
        src: appwriteService.getFilePreview(p.featuredImage),
        alt: p.title
    }))
    const fallbackImages = [
        {
            id: 'f1',
            src: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
            alt: 'Creative workspace'
        },
        {
            id: 'f2',
            src: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1600&auto=format&fit=crop',
            alt: 'Writing inspiration'
        },
        {
            id: 'f3',
            src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop',
            alt: 'Tech and creativity'
        }
    ]
    const slides = heroImages.length > 0 ? heroImages : fallbackImages

    useEffect(() => {
        if (slides.length <= 1) return
        const t = setInterval(() => {
            setCurrentSlide((s) => (s + 1) % slides.length)
        }, 4000)
        return () => clearInterval(t)
    }, [slides.length])
  
    return (
        <div className='w-full'>
            <section className="relative overflow-hidden">
                <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    {/* Bokeh / particle overlay */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                            <span
                              key={i}
                              className={`absolute rounded-full blur-2xl opacity-30 animate-pulse`}
                              style={{
                                background: i % 3 === 0 ? '#22C55E' : i % 3 === 1 ? '#818CF8' : '#EC4899',
                                width: `${24 + (i%5)*8}px`,
                                height: `${24 + (i%5)*8}px`,
                                top: `${Math.random()*90}%`,
                                left: `${Math.random()*90}%`,
                                animationDuration: `${2 + (i%5)}s`
                              }}
                            />
                        ))}
                    </div>
                    <Container>
                        <div className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
                            <div className="max-w-2xl text-slate-50">
                                <p className="uppercase tracking-wide text-slate-100/90 text-sm mb-3">Digital Publishing</p>
                                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                                    Write, Share, and Grow Your <span className="underline decoration-amber-400 decoration-4 underline-offset-8">BlogSphere</span>
                                </h1>
                                <p className="mt-4 text-slate-100/90 text-base md:text-lg">
                                    Create stunning stories with powerful editing and instant publishing.
                                    Join a creative community building the future of content.
                                </p>
                                <div className="mt-6 flex items-center gap-3">
                                    <Link to="/add-post">
                                        <Button className="rounded-xl px-5 py-2 flex items-center gap-2">
                                            {/* pen icon */}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16.5 3.5l4 4L7 21l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                                            Start Writing
                                        </Button>
                                    </Link>
                                    <Link to="/all-posts">
                                        <Button bgColor="bg-indigo-500 hover:bg-indigo-400" className="rounded-xl px-5 py-2 flex items-center gap-2">
                                            {/* play icon */}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5z"/></svg>
                                            Explore Posts
                                        </Button>
                                    </Link>
                                </div>
                                {/* Badge Row */}
                                <div className="mt-4 flex gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/20 text-white border border-white/30">New</span>
                                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/20 text-white border border-white/30">Trending</span>
                                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/20 text-white border border-white/30">AI</span>
                                </div>
                            </div>
                            <div className="w-full md:w-auto">
                                <div className="relative rounded-2xl bg-white/10 backdrop-blur p-1 border border-white/20 overflow-hidden">
                                    {slides.map((s, idx) => (
                                        <div
                                          key={s.id}
                                          className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                          style={{}}
                                        >
                                            <div className="h-56 w-[22rem] md:h-72 md:w-[32rem] rounded-xl overflow-hidden">
                                                <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                    {/* Dots */}
                                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                                        {slides.map((_, i) => (
                                            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}></button>
                                        ))}
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </Container>
                </div>
                {posts.length > 0 && (
                    <div className="bg-white/70 backdrop-blur border-t border-slate-200">
                        <Container>
                            <div className="py-4 overflow-x-auto">
                                <div className="flex gap-4 min-w-max">
                                    {posts.slice(0, 10).map((p) => (
                                        <Link key={p.$id} to={`/post/${p.$id}`} className="group">
                                            <div className="h-20 w-36 rounded-lg overflow-hidden bg-slate-200 shadow-sm group-hover:shadow-md">
                                                <img
                                                    src={appwriteService.getFilePreview(p.featuredImage)}
                                                    alt={p.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Container>
                    </div>
                )}
            </section>

            <section className='py-10'>
                <Container>
                    {posts.length === 0 ? (
                        <div className="text-center py-16">
                            <h2 className="text-3xl font-bold text-slate-800">No posts yet</h2>
                            <p className="mt-2 text-slate-600">Be the first to write something amazing.</p>
                            <div className="mt-6">
                                <Link to="/add-post">
                                    <Button className="rounded-xl px-5 py-2">Create Your First Post</Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}

export default Home