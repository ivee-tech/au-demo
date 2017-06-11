import { inject } from 'aurelia-framework';
import { HttpClient, json, RequestInit } from 'aurelia-fetch-client';

import environment from '../environment';

@inject(HttpClient)
export class DataService {


    constructor(private httpClient: HttpClient
    ) {
    }

    loadData(url: string) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpClient.fetch(url, {
            credentials: 'omit', // include
            headers: headers
        })
            .then(response => {
                return this.handleResponse(response);
            });
    }

    postData(url: string, data: any) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpClient.fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: headers
        })
            .then(response => {
                return this.handleResponse(response);
            });
    }

    searchGifs(searchText: string) {
        let url: string = `http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=dc6zaTOxFJmzC&limit=10&offset=0`;
        return this.loadData(url);
    }

    private handleResponse(response: any) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log(response);
            return response.json()
                .then(jsonResponse => {
                    return new Promise((resolve, reject) => {
                        if (jsonResponse) {
                            resolve(jsonResponse);
                        }
                        else {
                            reject(`${response.status} ${response.statusText}`);
                        }
                    });
            });
        }
    }
}
