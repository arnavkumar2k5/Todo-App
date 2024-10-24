import { Link } from "react-router-dom"
import TodoButton from "../../components/base/TodoButton"

function LandingContainer() {

    return (
        <div>
            <div className="flex flex-col justify-center items-center text-center mt-20 md:mt-40 m-5 md:w-[40%] shadow-2xl bg-white p-10 md:m-auto gap-5">
                <div className="font-bold text-3xl">Welcome to TodoApp!</div>
                <div>Ready to simplify your life, one task at a time? Let's make your day more productive and organized!</div>
                <div className="flex gap-2">
                        <Link to="/signUp">
                    <TodoButton className="hover:bg-black">
                        Get Started
                    </TodoButton>
                        </Link>
                        <Link to='/signIn'>
                    <div className="bg-white text-black hover:bg-slate-200 p-2 rounded-xl">Already have an account? Sign In</div>
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingContainer;