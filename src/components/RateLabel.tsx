export default function RateLabel({ rate }: { rate: number }) {

    const getLabelRate = (rateValue: number) => {
        if (rateValue <= 0.4) {
            return "Bad"
        }
        if (rateValue > 0.4 && rateValue < 0.8) {
            return "Regular"
        }
        if (rateValue >= 0.8) {
            return "Good"
        }
        return "Not Rated"
    }

    const getColorRate = (rateValue: number) => {
        if (rateValue <= 0.4) {
            return "text-red-500"
        }
        if (rateValue > 0.4 && rateValue < 0.8) {
            return "text-yellow-500"
        }
        if (rateValue >= 0.8) {
            return "text-green-500"
        }
        return "text-gray-500"
    }

    return <span className={`text-xs underline underline-offset-4 font-bold ${getColorRate(rate)}`}>{getLabelRate(rate)} - {rate}%</span>
}