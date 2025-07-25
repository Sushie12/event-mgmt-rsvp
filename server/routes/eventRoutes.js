const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

//router.post('/', createEvent); // ✅ No token required
//router.get('/', getAllEvents);
//router.post('/:id/rsvp', createRSVP);

// POST create event (no auth)
router.post('/', async (req, res) => {
  try {
    const { title, date } = req.body;
    const newEvent = new Event({
      title,
      date,
      rsvps: [], // empty RSVP list
    });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST RSVP (no auth)
router.post('/:id/rsvp', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Push the name from the request body to the rsvps array
    event.rsvps.push(req.body.name);
    await event.save();

    res.json({ message: 'RSVP successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

module.exports = router;



