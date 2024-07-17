/**
 * @param {number} initialEnergy
 * @param {number} initialExperience
 * @param {number[]} energy
 * @param {number[]} experience
 * @return {number}
 */
var minNumberOfHours = function (
  initialEnergy,
  initialExperience,
  energy,
  experience,
) {
  const needEnergy = energy.reduce((prev, curr) => prev + curr, 0);
  let needExp = 0,
    needNum = 0;
  for (let index = 0; index < experience.length; index++) {
    const element = experience[index];
    if (initialExperience <= element) {
      needExp += element - initialExperience + 1;
      // console.log(needExp);
      // console.log('needExp');
      needNum = element - initialExperience + 1;
    }
    initialExperience += element + needNum;
    // console.log(initialExperience);
    // console.log('initialExperience...');
    needNum = 0;
  }
  let energyResult =
    needEnergy - initialEnergy < 0 ? 0 : needEnergy - initialEnergy + 1;
  const result = energyResult + needExp;
  console.log(result);
  return result > 0 ? result : 0;
};

// []

// 1
// 1
// [1, 1, 1, 1]
// [1, 1, 1, 50]

minNumberOfHours(5, 1, [1, 3, 3], [1, 3, 7]);
// energy 3
// result +1
// result +1
// result + +1
