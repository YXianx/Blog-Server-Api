const { SuccessModel, ErrorModel } = require("../model/responseModel")

const {
    getBlogList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blog')

const blogRouter = (app)=>{
    // 获取博客列表
    app.get('/api/blog/list',(req,res)=>{
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listDataPromise = getBlogList(author,keyword)
        listDataPromise.then(listData=>{
            console.log(listData);
            if(listData)
                res.send(new SuccessModel(listData))
            else
                res.send(new ErrorModel(listData))
        })
    })

    // 获取博客详情
    app.get('/api/blog/detail',(req,res)=>{
        const detailDataPromise = getBlogDetail(req.query.id)
        if(detailDataPromise){
            detailDataPromise.then(detail=>{
                console.log(detail);
                if(detail)
                    res.send(new SuccessModel(detail))
                else
                    res.send(new ErrorModel(detail))
            })
        }  
    })

    // 新增博客
    app.post('/api/blog/new',(req,res)=>{
        const author = req.session.userdata.username
        const userId = req.session.userdata.id
        req.body.author = author
        req.body.userId = userId
        const newBlogDataPromise = createNewBlog(req.body)
        if(newBlogDataPromise){
            newBlogDataPromise.then(newBlogData=>{
                console.log(newBlogData);
                if(newBlogData)
                    res.send(new SuccessModel(newBlogData))
                else
                    res.send(new ErrorModel(newBlogData))
            })
        }  
    })

    // 修改博客
    app.post('/api/blog/update',(req,res)=>{
        const updatedBlogDataPromise = updateBlog(req.body.id,req.body)

        if(updatedBlogDataPromise){
            updatedBlogDataPromise.then(updataBlogData=>{
                console.log(updataBlogData);
                if(updataBlogData)
                    res.send(new SuccessModel("更新博客成功！"))
                else
                    res.send(new ErrorModel("更新博客失败..."))
            })
        }
    })

    // 删除博客
    app.post('/api/blog/delete',(req,res)=>{
        const deleteBlogDataPromise = deleteBlog(req.body.id)
        
        if(deleteBlogDataPromise){
            deleteBlogDataPromise.then(deleteBlogData=>{
                console.log(deleteBlogData);
                if(deleteBlogData)
                    res.send(new SuccessModel('删除博客成功！'))
                else
                    res.send(new ErrorModel('删除博客失败...'))
            })
        }
    })
}

module.exports = blogRouter