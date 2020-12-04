import Card from 'react-bootstrap/Card'
import { FormattedMessage } from 'react-intl';


export default function Movie(movie) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.movie.poster} />
            <Card.Body>
                <Card.Title>{movie.movie.name}</Card.Title>
                <Card.Text>
                    {movie.movie.description}
                </Card.Text>
                <Card.Text> 
                <FormattedMessage id="Cast" />: {movie.movie.cast}
                </Card.Text>
            </Card.Body>
        </Card>
    )

}
