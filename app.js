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

const muscle_groups = {
  upper_body: [
    'Biceps brachii',
    'Anterior deltoid',
    'Serratus anterior',
    'Pectoralis major',
    'Triceps brachii',
    'Trapezius',
    'Biceps femoris',
    'Latissimus dorsi',
    'Brachialis'
  ],
  lower_body: [
    'Gastrocnemius',
    'Gluteus maximus',
    'Quadriceps femoris',
    'Soleus'
  ],
  core: ['Rectus abdominis', 'Obliquus externus abdominis']
}

const equipment_id = {
  bodyweight: 7,
  dumbbell: 3,
  gym_access: 0
}

//GLOBAL VARIABLES
let equipment = equipment_id['bodyweight']
let muscle_bias = 'core'

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

  //organize muscle list and send to create workpout plan
  organizeMuscleList(muscles, muscle_bias, equipment)

  event.preventDefault()
}

function organizeMuscleList (muscle_list, muscle_bias) {
  console.log(muscle_list)
  //add muscle bias
  if (muscle_bias == 'core') {
    let muscle_options = muscle_groups['core']
    for (let i = 0; i < 2; i++) {
      console.log(muscle_options, muscle_options.length)
      for (let j = 0; j < muscle_options.length; j++) {
        muscle_list.push(muscle_options[j])
      }
    }
  } else if (muscle_bias == 'upper body') {
    let muscle_options = muscle_groups['upper_body']
    for (let j = 0; j < muscle_options.length; j++) {
      muscle_list.push(muscle_options[j])
    }
  } else if (muscle_bias == 'lower body') {
    for (let i = 0; i < 2; i++) {
      let muscle_options = muscle_groups['lower_body']
      for (let j = 0; j < muscle_options.length; j++) {
        muscle_list.push(muscle_options[j])
      }
    }
  }

  //filter muscle list
  console.log('hello')
  let new_muscles = []
  for (let i = 0; i < 10; i++) {
    let index = Math.floor(Math.random() * muscle_list.length)
    let new_muscle = muscle_list[index]

    //add to list
    new_muscles.push(new_muscle)
  }

  console.log(new_muscles)
  getExerciseList(new_muscles, equipment)
}

function getExerciseList (muscles, equipment) {
  console.log(muscles)
  //create muscle id search query
  let query = ''
  for (let i = 0; i < muscles.length; i++) {
    if (i == muscles.length - 1) {
      query += muscle_ids[muscles[i]]
    } else {
      query += muscle_ids[muscles[i]] + ','
    }
  }

  let exercises = []
  console.log(query)
  //search for workouts of specific muscle group based on api
  $.get(
    `https://wger.de/api/v2/exercise/?language=2&muscles=${query}&equipment=${equipment}`,
    function (data) {
      for (let j = 0; j < data.results.length; j++) {
        //check if exercise is already added
        if (!exercises.includes(data.results[j].name)) {
          //if not included then add to exercise list
          exercises.push(data.results[j].name)
        }
      }

      handleExercises(10, exercises)
    }
  )
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
