import axios from 'axios'
import config from '../config'


let api = {
    url: config.shopUrl,
    access_key: config.access_key,
    client_id: config.client_id,
    client_secret: config.client_secret,
    callAfterAuth: [],

    //Storefront API
    getCart: function (contextToken, callback) {
        axios({
            method: 'get',
            url: api.url + '/storefront-api/checkout/cart',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
                'x-sw-context-token': contextToken
            }
        }).then(function (response) {
            callback(response.data.data)
        })
    },

    newCustomer: function (data, callback) {
        axios({
            method: 'post',
            url: api.url + '/storefront-api/customer',
            crossDomain: true,
            crossOrigin: true,
            data: {
                salutation: data.salutation,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                email: data.email,
                billingCountry: data.country,
                billingZipcode: data.zipCode,
                billingCity: data.city,
                billingStreet: data.street,
                phone: data.phonenumber
            },
            headers: {
                'x-sw-access-key': api.access_key,
            }
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    loginCustomer: function (contextToken, data, callback) {
        axios({
            method: 'post',
            url: api.url + '/storefront-api/customer/login',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
                'x-sw-context-token': contextToken
            },
            data: {
                username: data.email,
                password: data.password
            }
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    logoutCustomer: function (contextToken) {
        axios({
            method: 'post',
            url: api.url + '/storefront-api/customer/logout',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
                'x-sw-context-token': contextToken
            }
        })
    },

    safeOrder: function (contextToken, callback) {
        axios({
            method: 'post',
            url: api.url + '/storefront-api/checkout/order',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
                'x-sw-context-token': contextToken
            }
        }).then(function (response) {
            callback(response.data)
        })
    },

    getProduct: function (uuid, callback) {
        axios({
            method: 'get',
            url: api.url + '/storefront-api/product/' + uuid,
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    createCart: function (callback) {
        axios({
            method: 'post',
            url: api.url + '/storefront-api/checkout/cart',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
            }
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    addLineItemToCart: function (contextToken, uuid, quantity, callback) {
        axios({
            method: 'post',
            url: api.url + '/storefront-api/checkout/cart/line-item/' + uuid,
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key,
                'x-sw-context-token': contextToken
            },
            data: {
                type: 'product',
                quantity: quantity,
                payload: {
                    id: uuid
                }
            }
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    getCountrys: function (callback) {
        axios({
            method: 'get',
            url: api.url + '/storefront-api/sales-channel/countries',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key
            },
        }).then(function (response) {
            callback(response.data)
        })
    },

    getPaymentMethods: function (callback) {
        axios({
            method: 'get',
            url: api.url + '/storefront-api/sales-channel/payment-methods',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key
            },
        }).then(function (response) {
            callback(response.data)
        })
    },

    setPaymentMethod: function (paymentMethodId, callback) {
        axios({
            method: 'put',
            url: api.url + '/storefront-api/context',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key
            },
            data: {
                paymentMethodId
            }
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    getShippingMethods: function (callback) {
        axios({
            method: 'get',
            url: api.url + '/storefront-api/sales-channel/shipping-methods',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key
            },
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    setShippingMethod: function (shippingMethodId, callback) {
        axios({
            method: 'put',
            url: api.url + '/storefront-api/context',
            crossDomain: true,
            crossOrigin: true,
            headers: {
                'x-sw-access-key': api.access_key
            },
            data: {
                shippingMethodId
            }
        }).then(function (response) {
            callback(response.data, true)
        }).catch(function (error) {
            callback(error, false)
        })
    },

    searchProducts: function (ingredientGroups, callback) {
        let ingredientList = [];
        ingredientGroups.forEach(function (item) {
            item.ingredients.forEach(function (ingredients) {
                ingredientList.push(ingredients);
            })
        });

        let resultList = [];

        ingredientList.forEach(function (listItem){
            console.log(listItem.name);
            axios({
                method: 'get',
                url: api.url + '/storefront-api/product?filter[product.name]=' + listItem.name,
                crossDomain: true,
                crossOrigin: true,
                headers: {
                    'x-sw-access-key': api.access_key,
                },
            }).then(function (response) {
                resultList.push(response.data)
            }).catch(function (error) {
            })

        })
    },

    getRecipe: function (recipeId, callback) {
        // axios({
        //     method: 'get',
        //     url: 'https://cors.io/?' + config.chefkochApiUrl + recipeId,
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     crossDomain: true,
        //     crossOrigin: true,
        // }).then(function (response) {
        //     callback(response.data, true)
        // }).catch(function (error) {
        //     callback(error, false)
        // })
        const data = '{"id":"1491131254215808","type":0,"title":"Spaghetti Carbonara","subtitle":"oder Tortellini Carbonara","owner":{"id":"c608f70d896977edcebdc24958d695cf","username":"Loeckchen87","rank":6,"role":"user","hasAvatar":false,"hasPaid":false,"deleted":false},"rating":{"rating":4.42,"numVotes":383},"difficulty":1,"hasImage":true,"hasVideo":true,"previewImageId":"1021900","preparationTime":5,"isSubmitted":true,"isRejected":false,"createdAt":"2009-09-29T14:09:14+02:00","imageCount":59,"editor":null,"submissionDate":null,"isPremium":false,"status":99,"servings":4,"kCalories":0,"instructions":"Die Pasta in reichlich Salzwasser bissfest kochen. Den Schinken in W\u00fcrfel schneiden und in wenig Butter anbraten. \\n\\nEigelb in einer gro\u00dfen Sch\u00fcssel mit Salz, Pfeffer und Muskat verquirlen. Die Butter schaumig r\u00fchren und gut unter das Eigelb mischen. Die Schinkenw\u00fcrfel und den geriebenen K\u00e4se gr\u00fcndlich unterr\u00fchren.\\n\\nWenn die Nudeln gar sind, abgie\u00dfen, sofort zu der Mischung in die Sch\u00fcssel geben, nochmal alles gr\u00fcndlich durchmischen, dann sogleich servieren.","miscellaneousText":"","ingredientsText":"","tags":["Hauptspeise","Schwein","gekocht","Pasta","Nudeln","Studentenk\u00fcche","einfach","Italien","Europa","Schnell","Ei","Camping"],"viewCount":3965603,"cookingTime":15,"restingTime":0,"totalTime":20,"ingredientGroups":[{"header":" ","ingredients":[{"id":"3348724","name":"Spaghetti","unit":"g","unitId":"3","amount":400,"isBasic":false,"usageInfo":"oder Tortellini","url":null,"foodId":"6059","productGroup":"Nudeln,  Reis & Co."},{"id":"3348725","name":"Schinken","unit":"g","unitId":"3","amount":200,"isBasic":false,"usageInfo":", roher","url":null,"foodId":"882","productGroup":"Fleisch und Wurstwaren"},{"id":"3348726","name":"Eigelb","unit":"","unitId":"9","amount":4,"isBasic":false,"usageInfo":"","url":null,"foodId":"3563","productGroup":"Milchprodukte,  K\u00e4se,  Eier & Co."},{"id":"3348727","name":"Butter","unit":"g","unitId":"3","amount":50,"isBasic":true,"usageInfo":"","url":null,"foodId":"70","productGroup":"Milchprodukte,  K\u00e4se,  Eier & Co."},{"id":"3348728","name":"Salz und Pfeffer","unit":"","unitId":"9","amount":0,"isBasic":false,"usageInfo":"","url":null,"foodId":"292","productGroup":"Gew\u00fcrze"},{"id":"3348729","name":"Muskat","unit":"Prise(n)","unitId":"106","amount":1,"isBasic":false,"usageInfo":"","url":null,"foodId":"798","productGroup":"Gew\u00fcrze"},{"id":"3348730","name":"Parmesan","unit":"n. B.","unitId":"7","amount":0,"isBasic":false,"usageInfo":", frisch geriebener","url":null,"foodId":"318","productGroup":"Milchprodukte,  K\u00e4se,  Eier & Co."}]}],"categoryIds":["160","81","164","192","88","33","13","187","15"],"recipeVideoId":"597","siteUrl":"https:\\/\\/www.chefkoch.de\\/rezepte\\/1491131254215808\\/Spaghetti-Carbonara.html"}';
        callback(data, true);
    },

};

export default {
    getCart: api.getCart,
    newCustomer: api.newCustomer,
    loginCustomer: api.loginCustomer,
    logoutCustomer: api.logoutCustomer,
    safeOrder: api.safeOrder,
    getCountrys: api.getCountrys,
    getPaymentMethods: api.getPaymentMethods,
    setPaymentMethod: api.setPaymentMethod,
    getProduct: api.getProduct,
    createCart: api.createCart,
    addLineItemToCart: api.addLineItemToCart,
    getShippingMethods: api.getShippingMethods,
    setShippingMethod: api.setShippingMethod,
    getRecipe: api.getRecipe,
    searchProducts: api.searchProducts
}
