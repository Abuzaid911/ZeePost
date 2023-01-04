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
                            <div className="flex justify-center -m-4">

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
                                            The idea behind this project
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            Day-to-Day, there are many new JavaScript libraries or
                                            Frameworks such as ReactJs, Angular, VueJs etc. Now the question
                                            arises to - Which one to learn ? <br />
                                            The answer to this question depends on for what you are using
                                            the framework, for example - If you want Front-End Development,
                                            you can use ReactJs, Angular or VueJs or if you want to choose

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
