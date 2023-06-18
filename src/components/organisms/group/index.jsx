import Grid from '../../molecules/grid'
import { colorGenerator } from '../../../utils/util'
import './styles.css'

export default function Group({groups,values}) {
    return (
        <div className='group'>{
            Object.keys(groups).map((group) => {
                return (
                    <Grid value={values[group]} name={group} key={group} color={colorGenerator()} amount={groups[group]}/>
                )
            })
        }
        </div>
    )
}