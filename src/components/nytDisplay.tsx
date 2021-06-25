import React from "react";

type AcceptedProps ={
    results: {
        response:{
            docs:[{
                _id: string,
                headline:{
                    main: string,
                },
                multimedia: [
                    {
                        url: string,
                    },
                ],
                keywords: [
                    {
                        value: string,
                    },
                ],
                snippet: string,
                web_url: string,
            }]
        }
    };
    changePageNumber: any,
}
const NytDisplay = (props: AcceptedProps) =>{

    return(
        <div>
            {props.results.response.docs.map(result =>{
                return(
                    <div key={result._id}>
                        <a href={result.web_url} target='_blank' rel='noreferrer'><h3>{result.headline.main}</h3></a>
                        {result.multimedia.length > 1 ? <img alt='article' src={`http://www.nytimes.com/${result.multimedia[0].url}`} /> : ''}
                        <p>
                            {result.snippet}
                            <br />
                            {result.keywords.length > 0 ? ' Keywords: ' : null}
                        </p>
                        <ul>
                            {result.keywords.length > 0 ? result.keywords.map(keyword => <li key={keyword.value}>{keyword.value}</li>) : null}
                        </ul>
                        <a href={result.web_url}><button>Read It</button></a>
                    </div>
                )
            })}
            <div>
                <button onClick={(e) => props.changePageNumber(e, 'down')}>Previous 10</button>
                <button onClick={(e) => props.changePageNumber(e, 'up')}>Next 10</button>
            </div>
        </div>
    )
}

export default NytDisplay;