const BaseService = require("./base.service");
let _commentRepository = null;
let _ideaRepository = null;

class CommentService extends BaseService{

    constructor({CommentRepository, IdeaRepository}) {
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = CommentRepository;
    }

    
    async getIdeaComments(ideaId) {
        if (!ideaId) {
            const error = new Error();
            error.status = 400;
            error.message = "ideaId does not found";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            const error = new Error();
            error.status = 404;
            error.message = "idea does not found";
            throw error;
        }

        const { comments } = idea;
        return comments;

    }


    async createComment(comment, ideaId) {
        if (!ideaId) {
            const error = new Error();
            error.status = 400;
            error.message = "ideaId does not found";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            const error = new Error();
            error.status = 404;
            error.message = "idea does not found";
            throw error;
        }

        const createComment = await _commentRepository.create(comment);
        idea.comments.push(createComment);
        return await _ideaRepository.update(ideaId, {comments: idea.comments});
    }
}

module.exports = CommentService;