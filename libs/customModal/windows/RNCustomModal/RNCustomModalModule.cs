using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Custom.Modal.RNCustomModal
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNCustomModalModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNCustomModalModule"/>.
        /// </summary>
        internal RNCustomModalModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNCustomModal";
            }
        }
    }
}
