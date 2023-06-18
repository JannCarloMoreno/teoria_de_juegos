import {Grid} from '../../molecules/grid'
import {colorGenerator} from '../../../utils/shapleyFunction'
import './styles.css'

export default function Group({groups}) {
    return (
        <div className='group'>{
            Object.keys(groups).map((group) => {
                return (
                    <Grid key={group} color={colorGenerator()} amount={groups[group]}/>
                )
            })
        }
        </div>
    )
}