import React from 'react';
import ReactDOM from 'react-dom';
//import MainContent from './MainContent';
//import Nav from './Nav';

class Root extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar />
                <MainContent />
            </div>
        );
    }
}

class MainContent extends React.Component {
    render() {
        return (
            <div className="mainContent">
                <Enterbar />
            </div>
        );
    }
}

class Enterbar extends React.Component {
    constructor(props){
        super(props);
        this.state = { originURL:"" , shortURL:"" };
        this.updateOriginURL = this.updateOriginURL.bind(this);
        this.shortURL = this.shortURL.bind(this);
    }

    updateOriginURL(e){
        this.setState({originURL:e.target.value});
    }

    // send ajax and get back
    shortURL(){
        var _this = this;
        $.ajax({
            url:'http://slURL.shuk.info/url',
            type: 'post',
            data: {
                url:this.state.originURL
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (data) {
                // show shortURL block
                _this.setState({ shortURL: data.shorturl });
            }
        });
    }

    render() {
        return (
            <div>
                <div className='floater'>
                </div>

                <div className='enterBar'>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Please input URL" onChange={this.updateOriginURL} value={this.state.originURL} />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.shortURL}>Short It</button>
                        </span>
                    </div>
                    <div className="input-group">
                        <input type="text" className="form-control" value={this.state.shortURL} id='shortURL'/>
                        <span className="input-group-btn">
                            <button id="shortURLcopy" className="btn btn-secondary" type="button" onClick='' data-clipboard-target="#shortURL" data-clipboard-action="copy" >Copy It</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {navitems:[]};
    }

    render() {
        var i = -1;
        let navitems_v = this.state.navitems.map(function(e) {
            i++;
            return (<li className='nav-item' key={i}><a class="nav-link" href="#">{e}</a></li>)
        })
        return (
            <nav className='navbar navbar-default navbar-inverse'>
                <a className='navbar-brand' href="/"> 
                    <img src="/img/favicon/favicon-32x32.png" width="30" height="30" alt="" />
                    <div> slURL </div>
                </a>
                <ul className='nav navbar-nav'>
                    {navitems_v}
                </ul>
            </nav>
        );
    }
}


new Clipboard('#shortURLcopy');

ReactDOM.render(<Root />,document.getElementById('root'));
