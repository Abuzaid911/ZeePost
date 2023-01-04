import { type NextPage } from "next";
import Nav from "../components/nav";
import NavTop from "../components/navtop";


const About: NextPage = () => {

    return (
        <div>
            <NavTop />

            <html lang="en">

                <body>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 lg:w-1/3">
                                    <div
                                        className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                                    >
                                        <h2
                                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                        >
                                            PYTHON
                                        </h2>
                                        <h1
                                            className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
                                        >
                                            Which Python version to use ?
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            Nowadays, there is a lot of discussion and argument as to which
                                            Python version to use. In this article, you will get to know
                                            which python version to use. As pythons versions are
                                            continously upgrading, people have a misconception that the new
                                            version of python has new features which are completely  
                                            different from the previous ones, which is not true. In fact,
                                            the new versions are derived from the previous python version
                                            itself. Thereby, you can choose any python version to start
                                            learning (preferably the latest one) if you are a beginner. If
                                            you are already learning Python and a new update comes, dont
                                            worry about it as it wont make a huge difference to your python
                                            journey.
                                        </p>
                                        <a className="text-indigo-500 inline-flex items-center"
                                        >Learn More
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/3">
                                    <div
                                        className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                                    >
                                        <h2
                                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                        >
                                            JAVSCRIPT
                                        </h2>
                                        <h1
                                            className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
                                        >
                                            Which JavaScript Framework to Learn ?
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            Day-to-Day, there are many new JavaScript libraries or
                                            Frameworks such as ReactJs, Angular, VueJs etc. Now the question
                                            arises to - Which one to learn ? <br />
                                            The answer to this question depends on for what you are using
                                            the framework, for example - If you want Front-End Development,
                                            you can use ReactJs, Angular or VueJs or if you want to choose
                                            from Back-End then the option for Node.Js, php arises. All of
                                            them will benefit you. It will depend on you how you find it
                                            easy or difficult. Now if the same question arises for database,
                                            then you have some options such as MongoDB and MySQL. If you
                                            want to do Back-End Web-Development, prefer MondoDB as you can
                                            easily use it with Node.js and is easy to learn.
                                        </p>
                                        <a className="text-indigo-500 inline-flex items-center"
                                        >Learn More
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/3">
                                    <div
                                        className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                                    >
                                        <h2
                                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                        >
                                            JAVASCRIPT
                                        </h2>
                                        <h1
                                            className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
                                        >
                                            Is React.Js Front-End or Back-End Library ?
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            React.js, developed and maintained by Facebook and a team of
                                            indivisual developers is a <strong>Front-End</strong> JavaScript
                                            Library. It is used in making web designs and is very powerful.
                                            It represents the <strong>R</strong> in MERN Development. MERN
                                            stands for
                                            <strong>MongoDb, Express, React.js and Node.js</strong><br />You
                                            can use React as a Front-End library instead of HTML as it is
                                            way more powerful thann HTML and has many additional Features
                                            such as Single-Page applications, Hooks etc.
                                        </p>
                                        <a className="text-indigo-500 inline-flex items-center"
                                        >Learn More
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </body>
            </html>
            <Nav active="about" />
        </div>
    );
};

export default About;
