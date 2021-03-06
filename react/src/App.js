import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import TopGames from './components/TopGames/TopGames';
import About from './components/About/About';
import News from './components/News/News';
import NewsItem from './components/NewsItem/NewsItem';
import SignupForm from './components/SignupForm/SignupForm';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import '../styles/site.less';

// logo = https://www.spreadshirt.es/image-server/v1/mp/designs/15527121,width=178,height=178/pro-gamer.png
class App extends React.Component {
    getChildContext() {
        return {
            user: {
                loginId: 'arnarl',
                displayName: 'Arnar Leifsson'
            }
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavigationBar logoImageUrl="https://www.spreadshirt.es/image-server/v1/mp/designs/15527121,width=178,height=178/pro-gamer.png" />
                    <div className="container">
                        <Switch>
                            <Route path="/topgames" component={TopGames} />
                            <Route path="/about" component={About} />
                            <Route path="/signup" component={SignupForm} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/login" component={Login} />
                            <Route exact path="/news" render={() => {
                                return <Redirect to="/" />;
                            }} />
                            <Route exact path="/" component={News} />
                            <Route path="/:newsId" component={NewsItem} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    };
}

App.childContextTypes = {
    user: PropTypes.shape({
        loginId: PropTypes.string,
        displayName: PropTypes.string
    })
};

// Define childContextTypes and use contextTypes for navigation bar

ReactDOM.render(<Provider store={createStore(reducers, applyMiddleware(thunk))}><Router><App /></Router></Provider>, document.getElementById('app'));
