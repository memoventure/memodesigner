export default function QuizElement() {

    return(
        <>
            <h2>Wie groß ist der Eifelturm?</h2>
            <form>
                <fieldset>
                    <div>
                        <input type="radio" id="Question1" name="answer" value="answer1"/>
                        <label htmlFor="Question1">235</label>
                    </div>
                    <div>
                        <input type="radio" id="Question2" name="answer" value="answer2"/>
                        <label htmlFor="Question2">356</label>
                    </div>
                    <div>
                        <button>Antwort speichern</button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}