let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();


app.use(cors());
app.use('/api', bodyParser.json(), router);  
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    { 
        'std': 0, 'id': '6035512013', 'name': 'Apinun', 'Major': 'CoE', 'gpa': 4.00 
    }

];

router.route('/students')
    .get((req, res) => res.json(students))

    .post((req, res) => {
        let student = {}
        student.std = students[students.length - 1].std + 1 
        student.id = req.body.id
        student.name = req.body.name
        student.Major = req.body.Major
        student.gpa = req.body.gpa
        students.push(student)
        res.json({ message: 'Student created!' })
    })


router.route('/students/:student_id')
    .get((req, res) => {

        let std = req.params.student_id
        let index = students.findIndex(student => (student.std === +std))
        console.log(index, students, students[index])
        res.json(students[index])
    })

    .put((req, res) => {                      
        let std = req.params.student_id
        let index = students.findIndex(student => (student.std === +std))

        students[index].id = req.body.id;
        students[index].name = req.body.name;
        students[index].Major = req.body.Major;
        students[index].gpa = req.body.gpa;

        res.json({ message: 'DONE Updated!' + req.params.student_id });
    })

    .delete((req, res) => {            
     
        let std = req.params.student_id
        let index = students.findIndex(student => student.std === +std)
        students.splice(index, 1) 
        console.log(index, students, std)

        res.json({ message: 'Deleted: ' + req.params.student_id });
    })


app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(80, () => console.log('Sever running'))


