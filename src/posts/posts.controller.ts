import { Controller } from '@nestjs/common';
import { ApiTags, ApiPropertyOptional, ApiOperation } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud'

class CreatePostDto{
    @ApiPropertyOptional({ description: '博客标题', example: '请输入博客标题' })
    @IsNotEmpty({message: '请填写标题'})
    title: string
    @ApiPropertyOptional({ description: '博客内容', example: '请输入博客内容' })
    content: string
}

@Crud({
    model: PostSchema,
    routes: {
        find: {
            decorators:[
                ApiOperation({summary: '博客列表'})
            ]
        },
        findOne:{
            decorators:[
                ApiOperation({summary: '博客详情'})
            ]
        },
        create:{
            decorators:[
                ApiOperation({summary: '增加博客'})
            ],
            dto: CreatePostDto // 接口描述用  这里是扩展 一般是在model中定义的
        },
        update:{
            decorators:[
                ApiOperation({summary: '修改博客'})
            ]
        },
        delete:{
            decorators:[
                ApiOperation({summary: '删除博客'})
            ]
        }
    }
})
@Controller('posts')
@ApiTags('帖子')
export class PostsController {
    constructor(
        @InjectModel(PostSchema) private readonly model: ModelType<PostSchema>
    ){ }
}
