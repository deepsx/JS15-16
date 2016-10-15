"use strist";
$(function() {
  // Вешаем обработчик на форму, ловим ENTER
    $('form.search').keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            formSubmit();
        }
    })
    // Вешаем обработчик на input
    $('#searchButton').click(function(e) {
        e.preventDefault();
        formSubmit();
    })
// После вызова, получаем значение текстового поля. Проверяем длину. Если длина = 0,
// то ничего не делаем. Если данные есть, то кодируем и отправляем в запрос $.ajax
    function formSubmit() {
        var searchQuery = $('#searchQuery').val();
        if (searchQuery.length > 0) {
            searchQuery = encodeURIComponent($('#searchQuery').val());
        } else {
            return;
        }
        // Переключаем вид поискового окна, убрав модификатор
        $('form.search').removeClass('search--main');
        // Для запуска Google custom search engine нужно запустить API (получить ключ),
        // создать поисковую машину (получить cx). Ограничение 100 запросов в сутки
        $.ajax({
            url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD_yotJt04CJfQ4Ibc7wG7uMLP5fEy_zfY&cx=016795527241021289695:jljvvlrwqde&q=' + searchQuery,
            // Если количество запросов на сервер превышает 100, то возвращается
            // код 403. Тут ничего не поделаешь, так что выводим alert
            statusCode: {
                403: function() {
                    alert('Превышена квота по запросам!');
                }
            },
            // Если запрос выполнен успешно, то из принимаемого JSON'a забираем
            // тольку ту часть, которая содержит данные по запросу
            success: function(response, msg) {
                var data = { // Шаблонизатор работает только с обьектами, а пришел массив
                    data: response.items
                };
                // С помощью шаблонизатора заполняем данными блок #content
                var html = $('#content').html();
                var content = tmpl(html, data);
                $('.content').html('');
                $('.content').append(content);
            }
        })
    }
    // Вторая часть задания. Создаем класс Human
    function Human(name, age, gender, height, weight) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.height = height;
      this.weight = weight;
    };
    // Создаем класс Worker
    function Worker(name, workPlace, sallary) {
      Human.call(this, name); // Вызываем конструктор предка, добавляем его свойства
      this.workPlace = workPlace;
      this.sallary = sallary;
    }
    // Создаем наследование для Worker от Human
    Worker.prototype = Object.create(Human.prototype);
    // Восстанавливаем для Worker ссылку на его конструктор. Верхняя строка его затерла
    Worker.prototype.constructor = Worker;
    // Добавляем метод work для класса Work
    Worker.prototype.work = function() {
      console.log("Я, " + this.name + ", работаю в " + this.workPlace + "!");
    }

    function Student(name, studyPlace, scholarship) {
      Human.call(this, name);
      this.studyPlace = studyPlace;
      this.scholarship = scholarship;
    }
    Student.prototype = Object.create(Human.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.watchSeries = function(seriesName) {
      if (seriesName) {
        console.log('Я, ' + this.name + ', смотрю сериал "' + seriesName + '"!');
      } else {
        console.log('Я, ' + this.name + ', смотрю сериалы!');
      }
    }
    // Создаем объект класса Worker
    var ivan = new Worker('Гриша', 'ООО "ЭМСС"', '100$');
    // Проверяем наличие свойств предка (Human)
    console.dir(ivan);
    // Проверяем работу метода work
    ivan.work();
    // Создаем еще одного рабочего
    var oleg = new Worker('Миша', 'ЗАО "ПБанк"', '10000грн.');
    console.dir(oleg);
    oleg.work();
    // Создадим пару студентов
    var student1 = new Student('Вася', 'ДГМА', '800грн');
    console.dir(student1);
    student1.watchSeries('Mr. Robot');
    var student2 = new Student('Петя', 'КПИ', '600грн');
    console.dir(student2);
    student2.watchSeries();
});
