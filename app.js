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

const exercise_packages = {
  '30_minutes': 5,
  '45_minutes': 7,
  '1_hour': 10,
  '1_hour_and_30_minutes': 15,
  '2_hours': 20
}

function displayinfo (exercises) {
  //clear workouts
  $('#workouts').html('')
  //add title
  $('#workouts').append('<h2>Your Plan</h2>')
  //add discription
  $('#workouts').append('<p>For most exercises, complete anywhere between 8-12 reps for 3 sets. If the exercise is time focused (ex. plank or hollow hold), then try to hold anywhere between 30 seconds to 2 minutes. </p>')
  //fill workouts
  $('#workouts').append('<div>')
  for (let i = 0; i < exercises.length; i++) {
    $('#workouts').append('<li>' + exercises[i] + '</li>')
  }
  $('#workouts').append('</div>')

  //scroll to bottom
  $("body, html").animate({
    scrollTop: $(document).height()
}, 1200)
}

function logSubmit (event) {
  //clear html
  $('#workouts').html(' ')

  //grab sport user searched
  let sport = $('#sport')
    .val()
    .toLowerCase()

  //grab user's equipment resources
  let equipment = $('#resources')
    .val()
    .toLowerCase()
  equipment = equipment_id[equipment]

  //grab user's muscle bias
  let muscle_bias = $('#muscle')
    .val()
    .toLowerCase()

  //grab timeframe
  let time = $('#length')
    .val()
    .toLowerCase()

  //grab muscle group based on sport
  let muscles = sport_muscles[sport]

  //organize muscle list and send to create workpout plan
  organizeMuscleList(muscles, muscle_bias, equipment, time)

  event.preventDefault()
}

function organizeMuscleList (muscle_list, muscle_bias, equipment, time) {
  //add muscle bias
  if (muscle_bias == 'core') {
    let muscle_options = muscle_groups['core']
    for (let i = 0; i < 2; i++) {
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
  let new_muscles = []
  for (let i = 0; i < 10; i++) {
    let index = Math.floor(Math.random() * muscle_list.length)
    let new_muscle = muscle_list[index]

    //add to list
    new_muscles.push(new_muscle)
  }

  getExerciseList(new_muscles, equipment, time)
}

function getExerciseList (muscles, equipment, time) {
  //create query string
  let query = 'https://wger.de/api/v2/exercise/?language=2&muscles='

  //create muscle id search query
  let musclequery = ''
  for (let i = 0; i < muscles.length; i++) {
    if (i == muscles.length - 1) {
      musclequery += muscle_ids[muscles[i]]
    } else {
      musclequery += muscle_ids[muscles[i]] + ','
    }
  }

  //add muscle ids to query
  query += musclequery

  //add equipment query if necessary
  if (equipment !== 0) {
    query += '&equipment=' + equipment
  }

  let exercises = []
  //search for workouts of specific muscle group based on api
  $.get(
    query,
    function (data) {
      for (let j = 0; j < data.results.length; j++) {
        //check if exercise is already added
        if (!exercises.includes(data.results[j].name)) {
          //if not included then add to exercise list
          exercises.push(data.results[j].name)
        }
      }
      handleExercises(exercise_packages[time], exercises)
    }
  )
}

function handleExercises (maximum, exercises) {
  let shuffled = exercises.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, maximum)

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
