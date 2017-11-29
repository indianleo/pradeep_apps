using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Native.Modal.RNNativeModal
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNNativeModalModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNNativeModalModule"/>.
        /// </summary>
        internal RNNativeModalModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNNativeModal";
            }
        }
    }
}
