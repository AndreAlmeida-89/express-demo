const Joi = require('joi')
const express = require('express')
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'python' },
    { id: 2, name: 'js' },
    { id: 3, name: 'c++' },
]

app.get('/', (req, res) => {
    res.send('Hello caralho!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('No course with this id!')
    res.send(course)
} )

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body)
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }

    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //LOOK UP COURSE
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('There is no such id')

    //VALIDATE
    const {error} = validateCourse(req.body)
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }
    //UPDATE
    course.name = req.body.name
    res.send(course)
})

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));