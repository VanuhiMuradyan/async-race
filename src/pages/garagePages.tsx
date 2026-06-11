import { CarForm } from "../components/carForm"
import { CarList } from "../components/carList"
import { RaceControls } from "../components/raceControls"
import { WinnerBanner } from "../components/winnerBanner"

export const GaragePage = () => {
    return (
        <div>
            <CarForm />
            <RaceControls />
            <CarList />

            <WinnerBanner />
        </div>
    )
}