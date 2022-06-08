// Список курсов
let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [200, 600] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [600, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [600, 1000];


/**
 * Функция фильтрует список курсов по заданному диапазону цены
 * @param {array} courses - Список курсов
 * @param {array} requiredRange - Диапазон цены для фильтрации
 * @returns {*[]} Отфильтрованный список курсов
 */
function filterCoursesByPriceRange(courses, requiredRange){
    try {
        const coursesArr = [...courses];
        const requiredRangeMinLimit = requiredRange[0] ? requiredRange[0] : 0;
        const requiredRangeMaxLimit = requiredRange[1] ? requiredRange[1] : Infinity;

        if (requiredRangeMaxLimit < requiredRangeMinLimit){
            throw new SyntaxError("Максимальное значение диапазона не может быть меньше минимального значение диапазона");
        }

        const filteredCoursesArr = coursesArr.filter((course) => {
            const courseMinPrice = course.prices[0] ? course.prices[0] : 0;
            const courseMaxPrice = course.prices[1] ? course.prices[1] : Infinity;

            try {
                if (courseMaxPrice < courseMinPrice){
                    throw new SyntaxError("Максимальная цена курса не может быть меньше минимальной цены");
                }

                if ((courseMinPrice <= requiredRangeMaxLimit) && (courseMinPrice >= requiredRangeMinLimit)) {
                    return true
                }
                if ((courseMaxPrice >= requiredRangeMinLimit) && (courseMaxPrice <= requiredRangeMaxLimit)) {
                    return true
                }
                if ((requiredRangeMaxLimit >= courseMinPrice) && (requiredRangeMaxLimit <= courseMaxPrice)) {
                    return true
                }
                if ((requiredRangeMinLimit <= courseMaxPrice) && (requiredRangeMinLimit >= courseMinPrice)) {
                    return true
                }

                return false

            } catch (e){
                console.log(e)
            }
        })

        return filteredCoursesArr
    }
    catch (e) {
        console.error(e)
    }
}

/**
 * Функция сортирует список по заданному порядку
 * @param {array} courses - Список курсов
 * @param {string} order - Порядок сортировки
 * @returns {array} - Отсортированный список курсов
 */
function sortCourses(courses, order){
    const sortableCourses = [...courses];
    const sortParameters = {
        asc: -1,
        desc: 1
    }

    sortableCourses.sort((courseA, courseB) => {
        const courseMinPriceA = courseA.prices[0] ? courseA.prices[0] : 0;
        const courseMinPriceB = courseB.prices[0] ? courseB.prices[0] : 0;

        if (courseMinPriceA < courseMinPriceB){
            return 1 * sortParameters[order]
        }
        if (courseMinPriceA > courseMinPriceB){
            return -1 * sortParameters[order]
        }
        if (courseMinPriceA === courseMinPriceB){
            return 0
        }
    })

    return sortableCourses
}


