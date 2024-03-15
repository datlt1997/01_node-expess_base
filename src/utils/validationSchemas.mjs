export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: 'Vui lòng Username nhập từ 5-32 ký tự'
    },
    notEmpty: {
      errorMessage: 'Username không để chuối rỗng'
    },
    isString: {
      errorMessage: 'vui lòng nhập chuỗi Username'
    }
  },
  displayname: {
    notEmpty: {
      errorMessage: 'display name không được để rỗng'
    }
  }
}

export const createUserValidationQuery = {
  filter: {
    isString: {
      errorMessage: 'vui lòng nhập chuỗi'
    },
    notEmpty: {
      errorMessage: 'Vui lòng nhập text'
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: 'Vui lòng nhập từ 3-10 ký tự'
    }
  }
}