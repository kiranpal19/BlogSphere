import conf from "../conf/conf";   
import { Client, ID, Databases, Storage,Query } from "appwrite";

export class Service{
    client = new Client ();
    databases ;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases= new Databases (this.client);
        this.bucket=new Storage (this.client);
    }

    _toDbPayload(data = {}) {
        const payload = {};
        if (typeof data.title !== "undefined") payload.title = data.title;
        if (typeof data.content !== "undefined") payload.content = data.content;
        if (typeof data.status !== "undefined") payload.status = data.status;
        if (typeof data.featuredImage !== "undefined") payload.featuredimage = data.featuredImage;
        if (typeof data.userId !== "undefined") payload.userid = data.userId;
        return payload;
    }

    _normalizeDoc(doc) {
        if (!doc) return doc;
        return {
            ...doc,
            featuredImage: typeof doc.featuredimage !== "undefined" ? doc.featuredimage : doc.featuredImage,
            userId: typeof doc.userid !== "undefined" ? doc.userid : doc.userId,
        };
    }

     async createPost({ title, slug, content , featuredImage, status, userId}){
        try {
            const payload = this._toDbPayload({ title, content, featuredImage, status, userId });
            const created = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                payload
            );
            return this._normalizeDoc(created);
            
        } catch (error) {
            console.log("Appwrite Service :: createPost::error", error?.message || error);
        }


     }

     async updatePost(slug, {title, content , featuredImage, status}){
        try {
            const payload = this._toDbPayload({ title, content, featuredImage, status });
            const updated = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                payload
            );
            return this._normalizeDoc(updated);
            
        } catch (error) {
             console.log("Appwrite service ::updatePost:: error", error?.message || error);
             
            
        }




     }

      async deletePost(slug){

        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             )
            return true
            
        } catch (error) {
            console.log("Appwrite service:: deletePost::error", error);
            return false
            
        }

      }

       async getPost(slug){

         try {
            const doc = await  this.databases.getDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug
            )
            return this._normalizeDoc(doc)
            
         } catch (error) {
             console.log("Appwrite service ::getPost:: error", error);
              return false
             
            
         }

       }

       async getPosts(queries= [Query.equal("status", "active")]){

         try {
            const list = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            return {
                ...list,
                documents: Array.isArray(list?.documents) ? list.documents.map((d) => this._normalizeDoc(d)) : [],
            }
         } catch (error) {
             console.log("Appwrite service:: getPosts:: error", error);
             return false
             
         }

       }

       // file upload services 


       async uploadFile(file){
        try {

             return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
             )
            
        } catch (error) {
            console.log("Appwrite service:: uploadFile::error", error);
            return false
            
            
        }
       }

       async deleteFile (fileId) {

         try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
             )
            
         } catch (error) {
            console.log("Appwrite service::deleteFile::error", error);
            return false
            
            
         }
        
       }

       getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
       }


}

const service = new Service()
export default service;