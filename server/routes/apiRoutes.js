import Spot from '../db/Spots';
import SpotsUsers from '../db/spotsUsersJoin';
import { sendBackJSON } from '../db/queryHelpers';
import {requestMultipleYelp, generateYelpNewBusParam} from '../yelp/yelpQuery';
import Promise from 'bluebird';
import _ from 'lodash';

export default function(app) {
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', (req, res) => {
    let spotsReturn;
    if (!req.user) {
      req.user = {
        id: Math.random() * 1000,
        username: 'defaultUser'
      };
    }
    console.log('user', req.user);
    Spot.getAllForUser(req.user)
      .then((spots) => {
        if (spots.length === 0) {
          return sendBackJSON(res, null, 'no spots');
        }
        spotsReturn = spots;
        return requestMultipleYelp(spots.map((spot) => {
          return generateYelpNewBusParam(spot.name, spot.longitude, spot.latitude);
        }));
      })
      .then((yelpResults) => {
        console.log('yelpresults looking for busid location', yelpResults);
        return spotsReturn.map((spot) => {
          let match = yelpResults.filter((result) => {
            let lowerLength = Math.min([spot.length, result.length]);
            return result.name.indexOf(spot.name.slice(lowerLength)) !== -1;
          });
          console.log('yelp stuff', match);
          if (match.length === 0) {
            spot.yelpData = {
              cuisine: null,
              image: null
            };
          } else {
            spot.yelpData = match[0];
          }
          return spot;
        });
      })
      .then((augmentedSpots) => sendBackJSON(res, augmentedSpots, 'got all spots'))
      .catch((err) => console.log(err));
  });

  app.get('/api/spots/:id', (req, res) => {
    Spot.getOne(req.params.id)
      .then((spot) => sendBackJSON(res, spot, 'got one spot'))
      .catch((err) => console.log(err));
  });

  app.post('/api/spots', (req, res) => {
    Spot.create(req.body)
      .then((spot) => {
        console.log('insert spot ', spot[0], 'with user id', req.user);
        return SpotsUsers.create({userid: req.user.id, spotid: spot[0].id});
      })
      .then((spotuser) => sendBackJSON(res, req.body, 'created new spot'))
      .catch((err) => {
        console.log(err);
        return sendBackJSON(res, err, 'error');
      });
  });

  app.put('/api/spots/:id', (req, res) => {
    Spot.update(req.body)
      .then((result) => sendBackJSON(res, result, 'updated a spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });

  app.delete('/api/spots/:id', (req, res) => {
    Spot.update(req.body)
      .then((result) => sendBackJSON(res, result, 'updated a spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });
}
