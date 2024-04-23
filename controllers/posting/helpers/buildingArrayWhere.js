const { Size, Importance, Section } = require('../../../src/db');


const buildingArrWhere = async ({ size, importance, section  }) => {
  let where = {
    deleted:false
  }

  if(size) {
    const sizeFound = await Size.findOne({
      where:{
        size
      }
    })
    where = {...where, sizeId:sizeFound.id}

  }

  if(importance) {
    const importanceFound = await Importance.findOne({
      where:{
        importance
      }
    })
    where = {...where,importanceId:importanceFound.id }
  }

  if(section) {
    const sectionFound = await Section.findOne({
      where:{
        name:section
      }
    })
    where = {...where,  sectionId:sectionFound.id}
  }
  return where
}

module.exports = buildingArrWhere


