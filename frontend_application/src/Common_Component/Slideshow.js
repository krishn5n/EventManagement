
import React, { useEffect, useState } from 'react';
import '../CSS/Slideshow.css'
import EnlargedEventComponent from '../CSS/EnlargedEventComponent.css';
import { useNavigate } from 'react-router-dom';

const Slideshow = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [enlarge, setEnlarge] = useState(false);
    const navigate = useNavigate();

    const openenlarge = () => {
        setEnlarge(true);
    };

    const closeenlarge = () => {
        setEnlarge(false);
    };

    const startSlideshow = () => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/topevents', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': props.jwt
                    }
                });
                const resultObj = await response.json();
                if (response.status === 200) {
                    setSlides(resultObj);
                    startSlideshow();
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

        return () => {
            // Cleanup function to stop the slideshow when the component unmounts
            clearInterval(startSlideshow());
        };
    }, [props.jwt]); // useEffect dependency on props.jwt

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    // Check if slides have been fetched
    if (slides.length === 0) {
        return <div>Loading...</div>; // or any loading indicator
    }

    // Get the current slide object
    const currentSlideData = slides[currentSlide];


    try {
        return (
            <div className="slideshow">
                <div className='leftbutcont'>
                    <button className='leftbut' onClick={prevSlide}>&#10094;</button>
                </div>
                <div className='slidecontainer'>
                    <div className="modal-contents-slide">
                        <div className="imagecontents">
                            <img src={currentSlideData.Eventimg || ' '} alt="" className="modal-imgs" />
                        </div>
                        <div className="infocontents">
                            <div className="clubdetailss">
                                <div className="clubnames">
                                    <h3>{currentSlideData.Clubname}</h3>
                                </div>
                                <div className="clubpics">
                                    <img src="https://cdn.pixabay.com/photo/2016/06/09/20/38/woman-1446557_640.jpg" className="clubimg" alt="" />
                                </div>
                            </div>
                            <div className="eventname">
                                <h2>{currentSlideData.Eventname}</h2>
                            </div>
                            <div className="eventdesc">
                                <p className="eventdesctext">
                                    {currentSlideData.Eventdesc}
                                </p>
                            </div>
                            <div className='toreg'>
                                <button type="button" className="btn btn-primary" onClick={openenlarge}>More Info/Register</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightbutcont'>
                    <button className='rightbut' onClick={nextSlide}>Next</button>
                </div>
                {enlarge && <EnlargedEventComponent setjwt={props.setjwt} jwt={props.jwt} onclose={closeenlarge} eventobj={{ 'title': currentSlideData.Eventname, 'imgurl': currentSlideData.Eventimg || ' ', 'descslice': currentSlideData.Eventdesc.slice(0, 140) || '', 'clubname': currentSlideData.Clubname || '', 'desc': currentSlideData.Eventdesc || '', 'stime': currentSlideData.Eventstart.split('T')[1].slice(0, -5) || '', 'sdate': currentSlideData.Eventstart.split('T')[1].split('-').reverse().join('-') || '', 'etime': currentSlideData.Eventenddate.split('T')[1].slice(0, -5) || '', 'edate': currentSlideData.Eventenddate.split('T')[0].split('-').reverse().join('-') || '', 'ecloseregtime': currentSlideData.Eventclosereg.split('T')[1].slice(0, -5) || '', 'ecloseregdate': currentSlideData.Eventclosereg.split('T')[0].split('-').reverse().join('-') || '', 'payment': currentSlideData.payment || 0, 'location': currentSlideData.Eventloc || '' }} />}
            </div>
        );
    }
    catch (err) {
        localStorage.removeItem('jwtToken');
        navigate("/notauthenticated");
    }
};

export default Slideshow;

/*


class Slideshowforuser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            slides: [],
            enlarge: false
        };
        this.openenlarge = this.openenlarge.bind(this);
        this.closeenlarge = this.closeenlarge.bind(this);
    }

    openenlarge() {
        this.setState({ enlarge: true });
    }

    closeenlarge() {
        this.setState({ enlarge: false });
    }


    async componentDidMount() {
        const slides = await this.setupslide();
        if (slides) {
            this.setState({ slides });
            this.startSlideshow();
        }
    }

    componentWillUnmount() {
        this.stopSlideshow(); // Stop the slideshow when the component is unmounted
    }

    startSlideshow = () => {
        // Set an interval to call the nextSlide function every 5 seconds
        const interval = setInterval(this.nextSlide, 10000);
        this.setState({ slideInterval: interval });
    };

    stopSlideshow = () => {
        // Clear the interval when the component is unmounted
        clearInterval(this.state.slideInterval);
    };

    async setupslide() {
        const url = 'http://localhost:8000/topevents';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.props.jwt
                }
            });

            const resultObj = await response.json();
            console.log(resultObj);
            if (response.status === 200) {
                return resultObj;
            }
            else if (response.status == 406) {

            }
        } catch (err) {
            console.log(err);
        }
    }



    nextSlide = () => {
        const { slides, currentSlide } = this.state;
        const nextSlideIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        this.setState({ currentSlide: nextSlideIndex });
    };

    prevSlide = () => {
        console.log('slide is :- ' + this.state.slides[this.state.currentSlide].Eventname)
        this.setState((prevState) => ({
            currentSlide: prevState.currentSlide === 0 ? prevState.slides.length - 1 : prevState.currentSlide - 1
        }));
    };




    render() {
        const { currentSlide, slides } = this.state;

        // Check if slides have been fetched
        if (slides.length === 0) {
            return <div>Loading...</div>; // or any loading indicator
        }

        // Get the current slide object
        const currentSlideData = slides[currentSlide];

        return (
            <div className="slideshow">
                <div className='leftbutcont'>
                    <button className='leftbut' onClick={this.prevSlide}>&#10094</button>
                </div>
                <div className='slidecontainer'>
                    <div className="modal-contents-slide">
                        <div className="imagecontents">
                            <img src={currentSlideData.Eventimg || ' '} alt="" className="modal-imgs" />
                        </div>
                        <div className="infocontents">
                            <div className="clubdetailss">
                                <div className="clubnames">
                                    <h3>{currentSlideData.Clubname}</h3>
                                </div>
                                <div className="clubpics">
                                    <img src="https://cdn.pixabay.com/photo/2016/06/09/20/38/woman-1446557_640.jpg" className="clubimg" alt="" />
                                </div>
                            </div>
                            <div className="eventname">
                                <h2>{currentSlideData.Eventname}</h2>
                            </div>
                            <div className="eventdesc">
                                <p className="eventdesctext">
                                    {currentSlideData.Eventdesc}
                                </p>
                            </div>
                            <div className='toreg'>
                                <button type="button" className="btn btn-primary" onClick={this.openenlarge}>More Info/Register</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightbutcont'>
                    <button className='rightbut' onClick={this.nextSlide}>Next</button>
                </div>
                {this.enlarge && <EnlargedEventComponent setjwt={this.props.setjwt} jwt={this.props.jwt} onclose={this.closeenlarge} eventobj={{ 'title': currentSlideData.Eventname, 'imgurl': currentSlideData.Eventimg || ' ', 'descslice': currentSlideData.Eventdesc.slice(0, 140) || '', 'clubname': currentSlideData.Clubname || '', 'desc': currentSlideData.Eventdesc || '', 'stime': currentSlideData.Eventstart.split('T')[1].slice(0, -5) || '', 'sdate': currentSlideData.Eventstart.split('T')[1].split('-').reverse().join('-') || '', 'etime': currentSlideData.Eventenddate.split('T')[1].slice(0, -5) || '', 'edate': currentSlideData.Eventenddate.split('T')[0].split('-').reverse().join('-') || '', 'ecloseregtime': currentSlideData.Eventclosereg.split('T')[1].slice(0, -5) || '', 'ecloseregdate': currentSlideData.Eventclosereg.split('T')[0].split('-').reverse().join('-') || '', 'payment': currentSlideData.payment || 0, 'location': currentSlideData.Eventloc || '' }} />}
            </div>
        );
    }
}

export default Slideshowforuser*/
