import axios from 'axios'
import firebase from '../../firebase'

const add_articles_from_api = (articles) => {
  return {
    type: 'ADD_ARTICLES_FROM_API',
    payload: articles
  }
}

export const fetch_articles_from_api = () => {
  return (dispatch, getState) => {
    const urlAPI = 'http://apibucket.sabikaorganizer.com:3008/readings/list'
    const userEmail = firebase.auth().currentUser
    const config = {
      headers: {
        email: userEmail.email
        // email: 'zuhri.nurhuda@gmail.com'
      }
    }
    axios.get(urlAPI, config)
    .then(({ data: { data } }) => {
      dispatch(add_articles_from_api(data))
    })
  }
}

const set_reading_status = (article) => {
  return {
    type: 'SET_READING_STATUS',
    payload: article
  }
}

export const get_reading_status = (articleId) => {
  return (dispatch, getState) => {
    const urlAPI = `http://apibucket.sabikaorganizer.com:3008/readings/detail/${articleId}`
    const userEmail = firebase.auth().currentUser
    const config = {
      headers: {
        email: userEmail.email
      }
    }
    axios.get(urlAPI, config)
    .then(({ data: { data } }) => {
      dispatch(set_reading_status(data))
    })
  }
}

export const get_categories_article = (category) => {
  return (dispatch, getState) => {
    const urlAPI = `http://apibucket.sabikaorganizer.com:3008/cheerio`
    const userEmail = firebase.auth().currentUser
    const config = {
      category: category,
      headers: {
        email: userEmail.email
      }
    }
    axios.post(urlAPI, config)
    .then(({ data: { data } }) => {
      dispatch(set_categories_article(data))
    })
  }
}

export const set_categories_article = (category) => {
  return {
    type: 'SET_CATEGORIES_ARTICLE',
    payload: category
  }
}

export const add_article_from_api = (category) => {
  return (dispatch, getState) => {
    const urlAPI = `http://apibucket.sabikaorganizer.com:3008/readings/set`
    const userEmail = firebase.auth().currentUser
    const dataPost = {
      url: category.url,
      category: category.category
    }
    const config = {
      headers: {
        email: userEmail.email
      }
    }
    console.log(config)
    axios.post(urlAPI, dataPost,  config)
    .then(({ data: { data } }) => {
      console.log(data, 'from add_article_from_api')
      dispatch(add_article(data, category))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const add_article = (article, category) => {
  return {
    type: 'ADD_ARTICLE',
    payload: {
      article,
      category
    }
  }
}

export const remove_article_from_api = (article) => {
  console.log(article)
  return (dispatch, getState) => {
    console.log(article, 'from remove article')
    const urlAPI = `http://apibucket.sabikaorganizer.com:3008/readings/delete/${article._id}`
    const userEmail = firebase.auth().currentUser
    const config = {
      headers: {
        email: userEmail.email
      }
    }
    axios.delete(urlAPI, config)
    .then(result => {
      dispatch(remove_article(article))
    })
  }
}

export const remove_article = (article) => {
  return {
    type: 'REMOVE_ARTICLE',
    payload: {
      article
    }
  }
}