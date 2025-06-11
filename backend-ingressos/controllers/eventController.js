const EventSchema = require('../models/Event')

//Criar Evento
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, price, image } = req.body;

    if (!title || !description || !date || price == null) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const newEvent = new EventSchema({ title, description, date, price, image });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar Evento", error: err.message });
  }
};


exports.getAllEvents = async(req,res)=>{
    try{
        const events = await EventSchema.find()
        res.json(events)
    }catch(err) {
        res.status(500).json({message: 'Erro ao buscar eventos', err})
    }
}

exports.getEventById = async (req,res)=>{
    try{
        const event = await EventSchema.findById(req.params.id)
        if(!event) return res.status(404).json({message: 'Evento não encontrado'})
        res.json(event)
    } catch(err){
        res.status(500).json({message: 'Erro ao buscar evento por Id'})
    }
}

exports.updateEvent = async (req, res)=>{
    try{
        const updated = await EventSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updated) return res.status(404).json({message: 'Evento não encontrado'})
        res.json(updated)
    } catch(err){
        res.status(500).json({message: 'Erro ao atualizar evento'})
    }
}

exports.deleteEvent = async (req,res)=>{
    try{
        const deleted = await EventSchema.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: 'Evento não encontrado'})
        res.json({message:"Evento Excluído com Sucesso!"})
    }catch{
        res.status(500).json({message: "Erro ao excluir Evento"})
    }
}



