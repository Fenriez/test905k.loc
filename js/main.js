let itemsPseudoDB = {
    "product1":
        {
            category: "electrical goods",
            name: "Реле DigiTOP 80 А МР-63А",
            type: "Реле напряжения",
            image: "url(../images/item0.jpg)",
            rank: "2.5",
            price: "735",
            discount: "25",
            gift: "",
            prop1: "Кол-во фаз: 1",
            prop2: "Макс. мощность: 17600 Вт",
            prop3: "Макс. ток: 80 А",
            prop4: "Напряжение: 220 В"
        },
    "product2":
        {
            category: "interior",
            name: "Коллаж Микс 3 фото 10х15 белый",
            type: "Рамка для фото",
            image: "url(../images/item1.jpg)",
            rank: "2",
            price: "169.9",
            discount: "",
            gift: "",
            prop1: "Вид: Коллаж",
            prop2: "Материал: Полирезина",
            prop3: "Формат: 10x15",
            prop4: "Страна: Китай"
        },
    "product3":
        {
            category: "household appliances",
            name: "Холодильник Nord NRB 139-030",
            type: "Холодильник",
            image: "url(../images/item2.jpg)",
            rank: "4",
            price: "6526",
            discount: "",
            gift: "",
            prop1: "Вид: Коллаж",
            prop2: "Материал: Полирезина",
            prop3: "Формат: 10x15",
            prop4: "Страна: Китай"
        },
    "product4":
        {
            category: "toys",
            name: "Mookie Cтол для игры с песком 1352MK",
            type: "Детские игровые наборы",
            image: "url(../images/item3.jpg)",
            rank: "4.2",
            price: "1699",
            discount: "51",
            gift: "1",
            prop1: "Для: девочка, мальчик", 
            prop2: "Возраст: от 3 лет",
            prop3: "Размер: 96,5x41,5x56",
            prop4: "Вес: 2700 г"   
        },
    "product5":
        {
            category: "interior",
            name: "Ковер Карат Daffi 13039/120 1,20х1,70 м",
            type: "Ковры",
            image: "url(../images/item4.jpg)",
            rank: "3.75",
            price: "1699",
            discount: "20",
            gift: "1",
            prop1: "Основа: Джут",
            prop2: "Размер: 120x170 см",
            prop3: "Высота ворса: 6 мм",
            prop4: "Состав: Полипропилен"
        },
    "product6":
        {
            category: "toys",
            name: "Стрелы Hasbro для бластеров Nerf Elite 12 шт",
            type: "Детское оружие",
            image: "url(../images/item5.jpg)",
            rank: "1.5",
            price: "159",
            discount: "19",
            gift: "",
            prop1: "Тип: мягкие пули", 
            prop2: "Возраст: От 8 лет",
            prop3: "Материал: Пена",
            prop4: "Страна: Китай"
        }
};

const idDB = ["product1", "product2", "product3", "product4", "product5", "product6"];
const currency = "грн";

const myModel = new model();
const myView = new view();
const myController = new controller();

myController.init(myModel, myView);

function model() {
    var products;
    var filteredProducts;

    function init(data) {
        if (!products) {
            products = filteredProducts = idDB.map(id => {
                var item = data[id];
                return item;
            });
        }
    };

    function getProducts() {
        return filteredProducts;
    };

    function filter(param) {
        filteredProducts = products;
        if (param == "Что выгодно") {
            filteredProducts = products.filter(product => {
                return product.discount;
            });
        } else if (param == "Идеи для подарков") {
            filteredProducts = products.filter(product => {
                return product.category == 'toys' || product.category == 'interior';
            });
        } else if (param == "Для идеальной фигуры") {
            filteredProducts = products.filter(product => {
                return product.category == 'household appliances';
            });
        } else {
            filteredProducts = products;
        };
    };

    this.init = init;
    this.getProducts = getProducts;
    this.filter = filter;
}

function view() {
    function init(controller) {
        this.controller = controller;
        this.navButton = document.querySelectorAll(".nav-button");        
        console.log(this.navButton);

        const filter = event => {
            this.navButton.forEach(item => {
                item.classList.remove("active");
            })
            event.target.classList.add("active");
            this.controller.filter(event.target.innerHTML);
            this.render();
        }

        this.navButton.forEach(item => {
            item.addEventListener('click', filter)
        });
        this.render();
    }

    function render() {
        this.productsBlock = document.querySelector("#productsBlock");
        this.products = this.controller.getProducts();
        
        this.productsBlock.innerHTML = "";

        function renderProductCard(productData) {
            var div = document.createElement("div");
            var span = document.createElement("span");
            var h3 = document.createElement("h3");
            var h4 = document.createElement("h4");
            var h6 = document.createElement("h6");
            var p = document.createElement("p");
            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var img = document.createElement("img");

            productCard = document.createElement("div");
            productCard.className = "product";
            productsBlock.appendChild(productCard);

            var imageBlock = document.createElement("div");
            imageBlock.className = "image-block";
            imageBlock.style.background = productData.image + " no-repeat center, #ffffff";
            productCard.appendChild(imageBlock);

            var options = document.createElement("div");
            options.className = "options";
            imageBlock.appendChild(options);
            div.className = "like";
            options.appendChild(div);
            div = document.createElement("div");
            div.className = "rotate";
            options.appendChild(div);

            var productRate = document.createElement("div");
            productRate.className = "product-rate";
            imageBlock.appendChild(productRate);

            div = document.createElement("div");
            div.style.width = (productData.rank * 20) + "%";
            productRate.appendChild(div);

            var descriptionBlock = document.createElement("div");
            descriptionBlock.className = "description-block";
            productCard.appendChild(descriptionBlock);

            var productName = document.createElement("div");
            productName.className = "product-name";
            descriptionBlock.appendChild(productName);
            h4.innerHTML = productData.name;
            h6.innerHTML = productData.type;
            productName.appendChild(h4);
            productName.appendChild(h6);

            var productPrice = document.createElement("div");
            productPrice.className = "product-price";
            descriptionBlock.appendChild(productPrice);

            var productProperties = document.createElement("div");
            productProperties.className = "product-properties";
            descriptionBlock.appendChild(productProperties);
            productProperties.appendChild(ul);
            li.innerHTML = productData.prop1;
            ul.appendChild(li);
            li = document.createElement("li");
            li.innerHTML = productData.prop2;
            ul.appendChild(li);
            li = document.createElement("li");
            li.innerHTML = productData.prop3;
            ul.appendChild(li);
            li = document.createElement("li");
            li.innerHTML = productData.prop4;
            ul.appendChild(li);
            li = document.createElement("li");

            if (+productData.discount > 0) {
                discountRender(productData.discount, imageBlock);
                var oldPrice = productData.price;
                var price = priceCalculate(productData.price, productData.discount);
                h3.innerHTML = price + " " + currency;
                productPrice.appendChild(h3);
                span.innerHTML = oldPrice + " ";
                productPrice.appendChild(span);
                p.innerHTML = currency;
                productPrice.appendChild(p);
            } else {
                h3.innerHTML = productData.price + " " + currency;
                productPrice.appendChild(h3);
            }

            if (productData.gift) {
                giftRender(imageBlock);
            };
        };

        function priceCalculate(price, discount) {
            price = (price - (price * (discount / 100))).toFixed(2);
            return price;
        };

        function discountRender(discount, imageBlock) {
            var div = document.createElement("div");
            var h6 = document.createElement("h6");
            div.className = "discount";
            h6.innerHTML = "-" + discount + "%";
            imageBlock.appendChild(div);
            div.appendChild(h6);
        };

        function giftRender(imageBlock) {
            var gift = document.createElement('div');
            gift.className = "gift";
            imageBlock.appendChild(gift);
        };

        this.products.forEach(productData => renderProductCard(productData));
    }
    this.init = init;
    this.render = render;
}

function controller() {
    function init(model, view) {
        this.model = model;
        this.view = view;
        this.model.init(itemsPseudoDB);
        this.view.init(this);
    };

    function getProducts() {
        return this.model.getProducts();
    }

    function filter(param) {
        this.model.filter(param);
    };
    this.init = init;
    this.getProducts = getProducts;
    this.filter = filter;
}