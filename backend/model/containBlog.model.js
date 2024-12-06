import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    tags:{
        type: String
    },
    comment:{
        type: String
    }
},{
    timestamps: true
});

const Blog = mongoose.model('blog', blogSchema);

export default Blog;