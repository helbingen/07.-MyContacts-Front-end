const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }
  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    const category = await CategoriesRepository.create({ name });
    response.status(201).json(category);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      //404: Not Found
      return response.status(404).json({ error: "Category not found" });
    }
    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      response.status(404).json({ error: "Category not found" });
    }

    if (!name) {
      response.status(400).json({ error: "Name is required" });
    }

    const categoryByName = await CategoriesRepository.findByName(name);
    if (categoryByName && categoryByName.name !== name) {
      response.status(400).json({ error: "This name is already in use." });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);
    //204: No Content
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
