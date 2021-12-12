import React, { useMemo, useState } from "react"
import { StarIcon } from "@heroicons/react/outline"
import { StarIcon as StarFullIcon } from "@heroicons/react/solid"
import Icon from "../misc/Icon"

const MAX_STARS = 5

const Rating = () => {
    const [stars, setStars] = useState(0)

    const starsJSX = useMemo(() => {
        const starElems = []
        for (let i = 0; i < MAX_STARS; ++i) {
            if (i < stars) {
                starElems[i] = <Icon key={i} icon={StarFullIcon} className="w-10 cursor-pointer" onClick={() => {
                    setStars(s => {
                        if (i + 1 === s)
                            return i
                        else
                            return i + 1
                    })
                }} />
            } else {
                starElems[i] = <Icon key={i} icon={StarIcon} className="w-10 cursor-pointer" onClick={() => setStars(i + 1)} />
            }
        }

        return <>{starElems}</>
    }, [stars])
    
    return starsJSX
}

export default Rating