'use client'
import styled from 'styled-components'

const ImgSkeletons = styled.div`
    content: '';
    display: block;
    width: 400px;
    height: 250px;
    background-color: aliceblue;
`

export function AA() {
    return (
        <div>
            <h3>Title...</h3>
            {/* <h3>The Living Ocean of New Lemuria</h3> */}
            <ImgSkeletons />
            <br />
            <b>content...</b>
            <p>content...</p>
            {/* <b>About this location:</b>
            <p>
                Surviving is usually extremely difficult, especially when nutrients are scarce and
                you have to choose between growing or reproducing. One species on this planet has
                developed a nifty method to prepare for this. Once full matured, this species will
                split into 2 versions of itself and attached to each other, so it's essentially
                reproducing. Once those 2 are fully grown, they newly grown version will either
                detach itself if enough nutrients are available or it becomes a storage unit for the
                original, if nutrients are scarce. If nutrients continue to be scarce, the original
                will use slowly consume the nutrients in the new version in the hope that new
                nutrients become available again and it can repeat the cycle.
            </p> */}
            <br />
        </div>
    )
}
