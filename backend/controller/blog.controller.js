import Blogs from '../model/containBlog.model.js';
import mongoose from 'mongoose';

export const create = async (req, res) =>{
    const {title, content, tags, comment} = req.body;
    try {
        if(!title || !content){
            res.status(400).json({success: false, message: 'title and content are required'});
        }
        const postBlog = new Blogs({title, content, tags, comment});

        await postBlog.save();
        res.status(201).json({success: true, message: 'Create successfully'});
    } catch(error){
        console.log('Error', error.message);
        
        res.status(400).json({success: false, message: 'server is Error'});
    }

};

export const read = async (req, res) =>{
    
    try {
        const Blog = await Blogs.find({});
        res.status(200).json({success: true, data: Blog});
    } catch(error){
        console.log('Error', error.message);
        res.status(400).json({success: false, message: 'server is Error'});
    }

};

export const Delete = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, message: 'Id not found'});
    }
    try{
        const deletedBlog = await Blogs.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({success: true, message: 'Delete successfully'});
    } catch(error){
        console.error('Error during delete operation:', error);
        res.status(400).json({success: false, message: 'server is Error'});
    }
};

export const Update = async (req, res) => {
    const { id } = req.params;
    const {title, content, tags, comment} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, message: 'Id not found'});
    }
    try{
        const updatedBlog = await Blogs.findByIdAndUpdate(id, {title, content, tags, comment}, {new: true});

        res.status(200).json({success: true, data: updatedBlog});
    } catch(error){
        console.error('Error during Update operation:', error);
        res.status(400).json({success: false, message: 'server is Error'});
    }
};