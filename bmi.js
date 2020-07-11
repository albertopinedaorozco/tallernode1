const bmi =(weight, height) => {
    return height===0 ? "Error" : weight/(height*height);
}


module.exports = bmi;
