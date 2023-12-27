 function isScrolledToBottom() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = scrollTop + windowHeight;
    return scrollPosition >= documentHeight - 250;
}

function formatDate(inputDate) {
    const [datePart] = inputDate.split(' ');
    const [year, month, day] = datePart.split(':');

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const newDate = new Date(year, month - 1, day);
    const monthName = monthNames[newDate.getMonth()];
    const yearPart = year;
    const formattedDate = `${monthName} ${day}, ${yearPart}`;
    return formattedDate;
}

function handleExifData(dateTimeOriginal, pId) {
    const p = document.getElementById(pId);
    if (dateTimeOriginal) {
        p.innerHTML = formatDate(dateTimeOriginal);
    }
}

function extractExifData(image, pId, callback) {
    image.onload = function() {
        EXIF.getData(image, function () {
            if (EXIF.getTag(this, "DateTimeOriginal")) {
                callback(EXIF.getTag(this, "DateTimeOriginal"), pId);
            } else if (EXIF.getTag(this, "DateTime")) {
                callback(EXIF.getTag(this, "DateTime"), pId);
            }
        })
    }
}

appendImage = (portofolioName, position, index, galleryRow) => {
    const imageDiv = document.createElement("div");
    imageDiv.className = "gallery-item";
    const newImage = document.createElement("img");

    newImage.src = `img/portfolio/${portofolioName}/${position}-${index}.jpeg`;
    newImage.className = "image";
    const pWithDate = document.createElement("p");
    pWithDate.id = `${position}-${index}`;
    pWithDate.className = "img-desc";
    extractExifData(newImage, `${position}-${index}`, handleExifData);
    imageDiv.appendChild(newImage);
    imageDiv.appendChild(pWithDate);
    galleryRow.appendChild(imageDiv);   
}

const parseTitleToHref = title => {
    return title ? `./${title.replaceAll(' ', '-').toLowerCase()}.html` : '';
};

appendAnchor = (portofolioName, position, index, galleryRow, arrayForPosition) => {
    const imageDiv = document.createElement("div");
    imageDiv.className = "port-item";
    const anchorElement = document.createElement("a");
    anchorElement.setAttribute('href', parseTitleToHref(arrayForPosition[index - 1]));

    const newImage = document.createElement("img");
    newImage.src = `img/portfolio/${portofolioName}/${position}-${index}.jpeg`;

    const pWithTitleForLeft = document.createElement("p");
    pWithTitleForLeft.id = "left-" + index;
    pWithTitleForLeft.className = "album-title";
    pWithTitleForLeft.innerHTML = arrayForPosition[index - 1]

    anchorElement.appendChild(newImage);
    anchorElement.appendChild(pWithTitleForLeft);
    imageDiv.appendChild(anchorElement);
    galleryRow.appendChild(imageDiv);  
}

function isScrolledToBottom() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = scrollTop + windowHeight;
    return scrollPosition >= documentHeight - 400;
}
