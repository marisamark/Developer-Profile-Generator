const axios = require('axios');
require('dotenv').config()

module.exports = {
    getUser: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
        return axios.get(queryUrl)
    },
    getStars: function(username){
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`
    
        return axios.get(queryUrl)
            .then(response => {
                return response.data.reduce((total, curr) => {
                    total += curr.stargazers_count;
                    return total
                }, 0)
            })
    
    },

    getFollowers: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
            .then(response => {
                return response.data.followers;       
            })
    },
    
    getFollowing: function(username){
            const queryUrl = `https://api.github.com/users/${username}`
        
            return axios.get(queryUrl)
                .then(response => {
                    return response.data.following;
                })
    },
    
    getRepos: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
        .then(response => {
            return response.data.public_repos;
        })
    
    },
    getUserbio: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
        .then(response => {
            return response.data.bio;
        })
    
    },

    getProfileimage: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
        .then(response => {
            return response.data.avatar_url;
            //get image to be linked!!!!
        })
    
    },
    getUserlocation: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
        .then(response => {
            return response.data.location;
        })
    
    },
    getGithubprofile: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
        .then(response => {
            return response.data.html_url;
        })
    
    },
    getCompany: function(username){
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get(queryUrl)
        .then(response => {
            return response.data.company;
        })
    
    },

}