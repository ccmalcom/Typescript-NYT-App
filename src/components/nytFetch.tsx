import React, {Component} from "react";
import NytDisplay from './nytDisplay'

type NytState ={
    searchTerm: string;
    startDate?: string;
    endDate?: string;
    pageNumber: number;
    results: {
        response:{
            docs:[{
                _id: string,
                headline:{
                    main: string,
                },
                multimedia: [
                    {
                        url: string;
                    }
                ],
                keywords: [
                    {
                        value: string;
                    }
                ],
                snippet: string,
                web_url: string,
            }]
        }
    };
}

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'DgIVGe24WvyESgpCgb9gS3tOy91slizg';

export default class NytFetch extends Component<{}, NytState>{
    constructor(props: {}){
        super(props);
        this.state ={
            results: {
                response:{
                    docs:[{
                        _id: '',
                        headline:{
                            main: '',
                        },
                        multimedia: [
                            {
                                url: ''
                            },
                        ],
                        keywords: [
                            {
                                value: ''
                            },
                        ],
                        snippet: '',
                        web_url: ''
                    }]
                }
            },
            searchTerm: '',
            startDate: '',
            endDate:'',
            pageNumber: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this)
        console.log(this.state.pageNumber);
    }
    // maybe make async
    fetchResults=()=>{
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
        console.log(url);

        fetch(url)
        .then(res => res.json())
        .then (data => this.setState({results: data}))
        .then(() => console.log(this.state.results))
        .catch(err => console.log(err))
    }

    handleSubmit(e: any ){
        e.preventDefault();
        this.fetchResults();
        this.setState({pageNumber: 0})
    }

    changePageNumber = (e: any, direction: string) =>{
        e.preventDefault();
        if(direction === 'down'){
            if(this.state.pageNumber > 0){
                // this.setState({pageNumber: this.state.pageNumber - 1});
                this.setState((state)=>{
                    return {pageNumber: state.pageNumber -1}
                });
                console.log(this.state.pageNumber);
                // this.fetchResults();
            }
        }
        if(direction === 'up'){
            // this.setState({pageNumber: this.state.pageNumber + 1});
            if(this.state.results.response.docs.length >= 10){
                this.setState((state)=>{
                    return {pageNumber: state.pageNumber + 1}
                });
            }
            console.log(this.state.pageNumber);
            // this.fetchResults();
        }
    }

    componentDidUpdate(prevProps:{}, prevState: NytState){
        if(this.state.pageNumber !== prevState.pageNumber){
            this.fetchResults()
        }
    }
    render(){
        return(
            <div>
                <form onSubmit={(e) =>{this.handleSubmit(e)}}>
                <span>Enter a single search term (required): </span>
                    <input type="text" name="search" onChange={(e) => this.setState({searchTerm: e.target.value})} required />
                    <br />
                    <span>Enter a start date: </span>
                    <input type="date" name="startDate" pattern='[0-9]{8}' onChange={(e) => this.setState({startDate: e.target.value})} />
                    <br />
                    <span>Enter a end date: </span>
                    <input type="date" name="endDate" pattern='[0-9]{8}' onChange={(e) => this.setState({endDate: e.target.value})} />
                    <br />
                    <button className='submit'>Submit search</button>
                </form>
                {this.state.results.response.docs.length > 1 ? <NytDisplay changePageNumber={this.changePageNumber} results={this.state.results}/> : null}
                
            </div>
        )
    }
}