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
                                            T3
                                        </h2>
                                        <h1
                                            className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
                                        >
                                            Welcome to the ultimate experience!
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            My name is Abuzaid and I am the brain behind this operation”I’m laughing rn lol”. I am a one-man team with a love for all things and a passion for creating awesome designs (and a lot more fun).
                                            Thank you for being here. I hope you enjoy using this app as much as I enjoyed creating it.

                                        </p>
                                     
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
