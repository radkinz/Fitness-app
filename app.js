//sports - muscle objects
const sport_muscles = {
  basketball: [
    'Quadriceps femoris',
    'Soleus',
    'Gastrocnemius',
    'Gluteus maximus',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Triceps brachii'
  ],
  baseball: [
    'Quadriceps femoris',
    'Soleus',
    'Gastrocnemius',
    'Gluteus maximus',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Trapezius',
    'Anterior deltoid',
    'Pectoralis major'
  ],
  football: [
    'Quadriceps femoris',
    'Soleus',
    'Gastrocnemius',
    'Gluteus maximus',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Pectoralis major',
    'Anterior deltoid',
    'Latissimus dorsi',
    'Serratus anterior'
  ],
  lacrosse: [
    'Quadriceps femoris',
    'Soleus',
    'Gastrocnemius',
    'Gluteus maximus',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Biceps femoris',
    'Biceps brachii',
    'Serratus anterior',
    'Triceps brachii',
    'Latissimus dorsi',
    'Trapezius'
  ],
  volleyball: [
    'Quadriceps femoris',
    'Soleus',
    'Gastrocnemius',
    'Gluteus maximus',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Latissimus dorsi',
    'Serratus anterior',
    'Anterior deltoid'
  ],
  swimming: [
    'Latissimus dorsi',
    'Triceps brachii',
    'Pectoralis major',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Quadriceps femoris'
  ],
  running: [
    'Gastrocnemius',
    'Gluteus maximus',
    'Quadriceps femoris',
    'Obliquus externus abdominis',
    'Rectus abdominis',
    'Soleu'
  ]
}

const muscle_ids = {
  'Biceps brachii': 1,
  'Anterior deltoid': 2,
  'Serratus anterior': 3,
  'Pectoralis major': 4,
  'Triceps brachii': 5,
  'Rectus abdominis': 6,
  Gastrocnemius: 7,
  'Gluteus maximus': 8,
  Trapezius: 9,
  'Quadriceps femoris': 10,
  'Biceps femoris': 11,
  'Latissimus dorsi': 12,
  Brachialis: 13,
  'Obliquus externus abdominis': 14,
  Soleus: 15
}

function displayinfo (exercises) {
  //fill workouts
  for (let i = 0; i < exercises.length; i++) {
    $('#workouts').append('<li>' + exercises[i] + '</li>')
    console.log(exercises[i])
  }
}

function logSubmit (event) {
  //clear html
  $('#workouts').html(' ')

  //grab sport user searched
  let sport = $('#sport')
    .val()
    .toLowerCase()
  console.log(sport)
  //grab muscle group based on sport
  let muscles = sport_muscles[sport]
  //get exercise list
  getExerciseList(muscles)

  event.preventDefault()
}

function getExerciseList (muscles) {
  let exercises = []
  for (let i = 0; i < muscles.length; i++) {
    //get the id for the muscle group to search in api
    let muscle_id = muscle_ids[muscles[i]]
    let exercises = []
    console.log(muscle_id)
    //search for workouts of specific muscle group based on api
    $.get(
      `https://wger.de/api/v2/exercise/?language=2&muscles=${muscle_id}`,
      function (data) {
        for (let j = 0; j < data.results.length; j++) {
          //check if exercise is already added
          if (!exercises.includes(data.results[j].name)) {
            //if not included then add to exercise list
            exercises.push(data.results[j].name)
          }
        }

        handleExercises(1, exercises)
      }
    )
  }
}

function handleExercises (maximum, exercises) {
  console.log(exercises, 'hello')

  let shuffled = exercises.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, maximum)

  console.log(selected, 'yo')
  displayinfo(selected)
}

const form = document.getElementById('form')
form.addEventListener('submit', logSubmit)

//API notes

//filter only english exercises: https://wger.de/api/v2/exercise/?language=2

//Exercises that train the biceps with barbells: https://wger.de/api/v2/exercise/?muscles=1&equipment=3

//muscle ids
//1.) Biceps brachii
//2.) Anterior deltoid
//3.) Serratus anterior
//4.) Pectoralis major
//5.) Triceps brachii
//6.) Rectus abdominis
//7.) Gastrocnemius
//8.) Gluteus maximus
//9.) Trapezius
//10.) Quadriceps femoris
//11.) Biceps femoris
//12.) Latissimus dorsi
//13.) Brachialis
//14.) Obliquus externus abdominis
//15.) Soleus

//Sport lists
//1.) Basketball: Quadriceps femoris, Soleus, Gastrocnemius, Gluteus maximus, Obliquus externus abdominis, Rectus abdominis, Triceps brachii
//2.) Baseball: Quadriceps femoris, Soleus, Gastrocnemius, Gluteus maximus, Obliquus externus abdominis, Rectus abdominis, Trapezius, Anterior deltoid, Pectoralis major
//3.) Football: Quadriceps femoris, Soleus, Gastrocnemius, Gluteus maximus, Obliquus externus abdominis, Rectus abdominis, Pectoralis major, Anterior deltoid, Latissimus dorsi, Serratus anterior
//4.) Lacrosse: Quadriceps femoris, Soleus, Gastrocnemius, Gluteus maximus, Obliquus externus abdominis, Rectus abdominis, Biceps femoris, Biceps brachii, Serratus anterior, Triceps brachii, Latissimus dorsi, Trapezius
//5.) Volleyball: Quadriceps femoris, Soleus, Gastrocnemius, Gluteus maximus, Obliquus externus abdominis, Rectus abdominis, Latissimus dorsi, Serratus anterior, Anterior deltoid
//6.) Swimming: Latissimus dorsi, Triceps brachii, Pectoralis major, Obliquus externus abdominis, Rectus abdominis, Quadriceps femoris
//7.) Track / xc: Gastrocnemius, Gluteus maximus, Quadriceps femoris, Obliquus externus abdominis, Rectus abdominis, Soleus
