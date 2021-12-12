const fs = require("fs");
const path = require("path");
function ReportCreator(data) {
  fs.writeFileSync(path.join(__dirname + "/report.json"), data);

  const dataObject = JSON.parse(data);
  let items = Object.keys(dataObject.allData).reduce(
    (acc, elem) =>
      (acc +=
        "\nНазвание: " +
        dataObject.allData[elem].unitTitle +
        "\n" +
        "Email-адрес человека, который задекларировал: " +
        dataObject.allData[elem].userEmail +
        "\n" +
        "Описание: " +
        dataObject.allData[elem].unitDesc +
        "\n" +
        "Время добавления: " +
        dataObject.allData[elem].arrivalDate +
        "\n" +
        "Сумма таможенного сбора:" +
        dataObject.allData[elem].taxValue +
        " Eur.\n"),
    0
  );
  let categories = Object.keys(dataObject.categories).reduce(
    (acc, category) =>
      (acc +=
        "\nКатегория: " +
        dataObject.categories[category].category +
        "\nКол-во товаров по данной категории: " +
        dataObject.categories[category].meets),
    0
  );
  fs.appendFileSync(
    path.join(__dirname + "/report.txt"),
    "Дата составления: " +
      new Date().toLocaleDateString() +
      items +
      "\n\n" +
      "Статистика категорий:" +
      categories +
      "\n\nОбщая сумма сборов: " +
      dataObject.totalValue +
      "\n\n"
  );
}
module.exports = ReportCreator;
