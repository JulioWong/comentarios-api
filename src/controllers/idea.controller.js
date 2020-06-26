let _ideaService = null;

class IdeaController {
    constructor({IdeaService}) {
        _ideaService = IdeaService;
    }

    async get(req, res) {
        const { IdeaId } = req.params;
        const idea = await _ideaService.get(IdeaId);
        return res.send(idea);
    }

    async getAll(req, res) {
        const ideas = await _ideaService.getAll();
        return res.send(ideas);
    }
    
    async create(req, res) {
        const {body} = req;
        const createdIdea = await _ideaService.create(body);
        return res.status(201).send(createdIdea);
    }

    async update(req, res) {
        const { body } = req;
        const {IdeaId}  = req.params;
        const updateIdea = await _ideaService.update(IdeaId, body);
        return res.send(updateIdea);
    }

    async delete(req, res) {
        const { IdeaId } = req.params;
        const deleteIdea = await _ideaService.delete(IdeaId);
        return res.send(deleteIdea);
    }

    async getUserIdeas(req, res) {
        const {userId} = req.params;
        const ideas = await _ideaService.getUserIdeas(userId)
        return res.send(ideas);
    }

    async upvoteIdea(req, res) {
        const { ideaId } = req.params;
        const idea = await _ideaService.upvoteIdea(ideaId);
        return res.send(idea);
    }

    async downvoteIdea(req, res) {
        const { ideaId } = req.params;
        const idea = await _ideaService.downvoteIdea(ideaId);
        return res.send(idea);
    }
}

module.exports = IdeaController;