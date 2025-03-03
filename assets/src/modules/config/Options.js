/**
 * @module config/Options.js
 * @copyright 2023 3Liz
 * @author DHONT René-Luc
 * @license MPL-2.0 - Mozilla Public License 2.0 : http://www.mozilla.org/MPL/
 */

import { BaseObjectConfig } from './BaseObject.js';
import { ValidationError } from './../Errors.js';

const requiredProperties = {
    'bbox': {type: 'extent'},
    'initialExtent': {type: 'extent'},
    'mapScales': {type: 'array'},
    'minScale': {type: 'number'},
    'maxScale': {type: 'number'},
    'projection': {type: 'object'},
    'pointTolerance': {type: 'number'},
    'lineTolerance': {type: 'number'},
    'polygonTolerance': {type: 'number'},
    'popupLocation': {type: 'string'},
    'datavizLocation': {type: 'string'}
};

const optionalProperties = {
    'hideProject': {type: 'boolean', default: false},
    'wmsMaxHeight': {type: 'number', default: 3000},
    'wmsMaxWidth': {type: 'number', default: 3000},
    'fixed_scale_overview_map': {type: 'boolean', default: true},
    'use_native_zoom_levels': {type: 'boolean', nullable: true, default: null},
    'hide_numeric_scale_value': {type: 'boolean', default: false},
};

/**
 * Class representing the options config
 * @class
 * @augments BaseObjectConfig
 */
export class OptionsConfig  extends BaseObjectConfig {

    /**
     * Create an options config instance based on a config object
     * @param {object}   cfg                                  - the lizmap config object for options
     * @param {number[]} cfg.bbox                             - the project and web services max extent
     * @param {number[]} cfg.initialExtent                    - the map extent at the loading page
     * @param {number[]} cfg.mapScales                        - the map scales
     * @param {number}   cfg.minScale                         - the map's min scale
     * @param {number}   cfg.maxScale                         - the map's max scale
     * @param {object}   cfg.projection                       - the web map projection
     * @param {number}   cfg.pointTolerance                   - the point tolerance for QGIS Server WMS GetFeatureInfo request
     * @param {number}   cfg.lineTolerance                    - the line tolerance for QGIS Server WMS GetFeatureInfo request
     * @param {Number}   cfg.polygonTolerance                 - the polygon tolerance for QGIS Server WMS GetFeatureInfo request
     * @param {String}   cfg.popupLocation                    - the popup location in the User interface: dock, bottom-dock, right-dock, mini-dock, map
     * @param {String}   cfg.datavizLocation                  - the popup location in the User interface: dock, bottom-dock, right-dock
     * @param {Boolean}  [cfg.hideProject=false]              - is the project hidden in user interface ? Only services are available.
     * @param {Number}   [cfg.wmsMaxHeight=3000]              - the image max height for WMS GetMap request
     * @param {Number}   [cfg.wmsMaxWidth=3000]               - the image max width for WMS GetMap request
     * @param {Boolean}  [cfg.fixed_scale_overview_map=true]  - does the Overview map have fixed scale ?
     * @param {Boolean}  [cfg.use_native_zoom_levels=false]   - does the map use native zoom levels ?
     * @param {Boolean}  [cfg.hide_numeric_scale_value=false] - does the scale line hide numeric scale value ?
     */
    constructor(cfg) {
        if (!cfg || typeof cfg !== "object") {
            throw new ValidationError('The `options` in the config is not an Object!');
        }

        if (Object.getOwnPropertyNames(cfg).length == 0) {
            throw new ValidationError('The `options` in the config is empty!');
        }

        super(cfg, requiredProperties, optionalProperties)
    }

    /**
     * The project is hidden in user interface
     * Services are still available
     * @type {boolean}
     */
    get hideProject() {
        return this._hideProject;
    }

    /**
     * The project and web services max extent
     * @type {Extent}
     */
    get bbox() {
        return this._bbox;
    }

    /**
     * The map extent at the loading page
     * @type {Extent}
     */
    get initialExtent() {
        return this._initialExtent;
    }

    /**
     * The web map scales
     * @type {Array}
     */
    get mapScales() {
        return this._mapScales;
    }

    /**
     * The web map min scale
     * @type {number}
     */
    get minScale() {
        return this._minScale;
    }

    /**
     * The web map max scale
     * @type {number}
     */
    get maxScale() {
        return this._maxScale;
    }

    /**
     * The web map projection
     * @type {object}
     */
    get projection() {
        return this._projection;
    }

    /**
     * The QGIS Server point tolerance for
     * WMS GetFeatureInfo request
     * @type {number}
     */
    get pointTolerance() {
        return this._pointTolerance;
    }

    /**
     * The QGIS Server line tolerance for
     * WMS GetFeatureInfo request
     * @type {number}
     */
    get lineTolerance() {
        return this._lineTolerance;
    }

    /**
     * The QGIS Server polygon tolerance for
     * WMS GetFeatureInfo request
     * @type {number}
     */
    get polygonTolerance() {
        return this._polygonTolerance;
    }

    /**
     * The popup location in the User interface
     * dock, bottom-dock, right-dock, mini-dock, map
     * @type {string}
     */
    get popupLocation() {
        return this._popupLocation;
    }

    /**
     * The popup location in the User interface
     * dock, bottom-dock, right-dock
     * @type {string}
     */
    get datavizLocation() {
        return this._datavizLocation;
    }

    /**
     * The image max height for WMS GetMap request
     * @type {number}
     */
    get wmsMaxHeight() {
        return this._wmsMaxHeight;
    }

    /**
     * The image max width for WMS GetMap request
     * @type {number}
     */
    get wmsMaxWidth() {
        return this._wmsMaxWidth;
    }

    /**
     * The Overview map has fixed scale
     * @type {boolean}
     */
    get fixed_scale_overview_map() {
        return this._fixed_scale_overview_map;
    }

    /**
     * The map uses native zoom levels
     * @type {boolean}
     */
    get use_native_zoom_levels() {
        if (this._use_native_zoom_levels !== null) {
            return this._use_native_zoom_levels;
        }

        if (this.projection.ref == 'EPSG:3857') {
            return true;
        }
        if (this.mapScales.length == 2) {
            return true;
        }
        return false;
    }

    /**
     * Hide numeric scale value
     * @type {boolean}
     */
    get hide_numeric_scale_value() {
        return this._hide_numeric_scale_value;
    }
}
