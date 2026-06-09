import { CarForm } from "../components/carForm"
import { CarList } from "../components/carList"
import { RaceControls } from "../components/raceControls"

export const GaragePage = () => {
    return (
        <div>
            <CarForm />
            <RaceControls />
            <CarList />
        </div>
    )
}