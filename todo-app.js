(function() {
    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    // создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input', 'mb-3');
        input.classList.add('form-control');
        input.placeholder =  'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
        /*
        <form class="input-group mb-3">
          <input class="form-control" placeholder="Введение названия нового дела">
          <div class="input-group-append">
            <button class="btn btn-primary">Добавить дело</button>
          </div>
        </form>  
        */
    }
    // создаем и возвращаем список элементов
    function createTodoList() {
      let list = document.createElement('ul');
      list.classList.add('list-group');
      return list;
    }

    // создаем элементы списка с кнопками
    function createTodoItem(name) {
    // создаем элемент дел и создаем кнопки и элемент в котором они будут красиво
    // отображены
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    
    // стилизуем 
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // Объеденяем кнопки в блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    
    // приложению нужен доступ к элементу и к кнопкам
    return {
        item,
        doneButton,
        deleteButton,
    };
    }

    function createTodoApp(container, title = 'Список дел') {
        // let container = document.getElementById(container);

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        //Браузер создает событие submit на форме.
        // Нажатие энтер либо кнопку
    todoItemForm.form.addEventListener('submit', function(e) {
        //эта строчка необходима, чтобы предотвратить стандартное действие браузера
        //в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
        e.preventDefault();
        //игнорируем создание элемента, если пользователь ничего не ввел
        if (!todoItemForm.input.value) {
            return;
        }
        //создаем и добавляем в список новое дело с названием из поля 
        let todoItem = createTodoItem(todoItemForm.input.value);
        //добавляем обработчики на кнопки
        todoItem.doneButton.addEventListener('click', function(){
            todoItem.item.classList.toggle('list-group-item-success');
        });
        todoItem.deleteButton.addEventListener('click', function(){
            if (confirm('Вы уверены?')) {
                todoItem.item.remove();
            }
        })

        //создаем и добавляем в список новое дело
        todoList.append(todoItem.item);
        //обнуляем значение в поле, чтобы не пришлось стирать его 
        todoItemForm.input.value = '';
    })
    }
    window.createTodoApp = createTodoApp;
}
    
)();
