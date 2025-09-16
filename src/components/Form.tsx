import CalculateButton from './CalculateButton.tsx'
import Height from './Height.tsx'
import Weight from './Weight.tsx'

export default function Form() {

    return (
        <div className="data">
            <div className="form">
                <Height />
                <Weight />
                <CalculateButton />
            </div>
        </div>
    )
}

