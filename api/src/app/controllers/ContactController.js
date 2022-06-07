const { response } = require("express");
const req = require("express/lib/request");
const ContactsRepository = require("../repositories/ContactsRepository");
const isValidUUID = require('../utils/isValidUUID')

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      //404: Not Found
      return response.status(404).json({ error: "Contact not found" });
    }
    response.json(contact);
  }
  async store(request, response) {
    // response.send(request.body);
    const { name, email, phone, category_id } = request.body;
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' })
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);
      if (contactExists) {
        return response
          .status(400)
          .json({ error: "This e-mail is already in use" });
      }
    }
    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name, email, phone, category_id } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' })
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!name) {
      response.status(400).json({ error: "Name is required" });
    }

    if (!contactExists) {
      response.status(404).json({ error: "Contact not found" });
    }



    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        response.status(400).json({ error: "This e-mail is already in use." });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    await ContactsRepository.delete(id);
    //204: No Content
    response.sendStatus(204);
  }
}

//Singleton
//Instancia somente um objeto
module.exports = new ContactController();
